// app/(admin)/dashboard/homepage/page.tsx
import { createServerClient } from "@/supabase/server";
import { HomepageForm } from "@/components/admin/homepage-form"; // We create this next

export default async function ManageHomepage() {
  const supabase = await createServerClient();
  
  // Fetch existing content to pre-populate the form
  const { data: homepageContent, error } = await supabase
    .from('homepage_content')
    .select('*')
    .single();

  if (error && error.code !== 'PGRST116') { // PGRST116 means no rows found, which is fine
    console.error('Error fetching homepage content:', error);
  }

  const { data: stories } = await supabase
    .from('success_stories')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold font-lora">Manage Homepage Content</h1>
      <p className="mt-2 text-medium-grey">Update the content that appears on the public-facing homepage.</p>
      
      <HomepageForm
        initialContent={homepageContent}
        stories={stories || []}
      />
    </div>
  );
}