// lib/actions.ts
"use server";
import { createServerClient } from "@/supabase/server";
import { revalidatePath } from "next/cache";

interface HomepageContentFormData {
  hero_headline_en: string;
  hero_headline_de: string;
  // Add other fields as needed
}

export async function updateHomepageContentAction(formData: HomepageContentFormData) {
  const supabase = await createServerClient();
  
  // Basic role check - in reality, this would be more robust middleware
  await supabase.auth.getUser();
  // Fetch user role from your users table... if not admin, return error.
  
  const contentToUpdate = {
    hero_content: {
      en: { headline: formData.hero_headline_en },
      de: { headline: formData.hero_headline_de },
    },
    // ... structure other data similarly
  };

  const { error } = await supabase
    .from('homepage_content')
    .upsert({ id: 1, ...contentToUpdate }); // Upsert creates if not exists

  if (error) {
    return { success: false, error: error.message };
  }

  // VERY IMPORTANT: Invalidate the cache for the homepage
  revalidatePath('/(public)/[locale]', 'layout');

  return { success: true };
}