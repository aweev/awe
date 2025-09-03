// components/admin/homepage-form.tsx
"use client";

import { useForm } from "react-hook-form";
import { updateHomepageContentAction } from "@/lib/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useTransition } from "react";

interface HomepageFormProps {
  initialContent: {
    hero_content?: {
      en?: { headline?: string };
      de?: { headline?: string };
    };
    // Add other fields as needed
  };
  stories: unknown; // Replace 'unknown' with a more specific type if possible
}

export function HomepageForm({ initialContent }: HomepageFormProps) {
  const [isPending, startTransition] = useTransition();
  const { register, handleSubmit } = useForm({
    defaultValues: {
      hero_headline_en: initialContent?.hero_content?.en?.headline || "",
      hero_headline_de: initialContent?.hero_content?.de?.headline || "",
      // ... other fields for subheadline, stats, etc.
    },
  });

  type FormData = {
    hero_headline_en: string;
    hero_headline_de: string;
    // Add other fields as needed
  };

  const onSubmit = (data: FormData) => {
    startTransition(async () => {
      const result = await updateHomepageContentAction(data);
      if (result.success) {
        alert("Homepage updated successfully!");
      } else {
        alert(`Error: ${result.error}`);
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-8 max-w-3xl">
      <div className="p-6 border rounded-lg">
        <h2 className="text-xl font-semibold font-lora">Hero Section</h2>
        <div className="mt-4 space-y-4">
          <div>
            <Label htmlFor="hero_headline_en">Headline (English)</Label>
            <Input id="hero_headline_en" {...register("hero_headline_en")} />
          </div>
          <div>
            <Label htmlFor="hero_headline_de">Headline (German)</Label>
            <Input id="hero_headline_de" {...register("hero_headline_de")} />
          </div>
          {/* Add Textarea for subheadline, file input for video/image, etc. */}
        </div>
      </div>

      {/* Add similar blocks for Impact Stats, Differentiators, etc. */}
      
      <Button type="submit" disabled={isPending}>
        {isPending ? "Saving..." : "Save Changes"}
      </Button>
    </form>
  );
}