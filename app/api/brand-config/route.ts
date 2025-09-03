// app/api/brand-config/route.ts
import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/supabase/server";
import { BrandConfig } from "@/lib/config/brand";

// GET /api/brand-config - Fetch current brand configuration
export async function GET() {
  try {
    const supabase = await createServerClient();

    // Fetch brand config from Supabase
    const { data, error } = await supabase
      .from("brand_config")
      .select("*")
      .single();

    if (error && error.code !== "PGRST116") {
      // PGRST116 is "no rows returned"
      console.error("Error fetching brand config:", error);
      return NextResponse.json(
        { error: "Failed to fetch brand configuration" },
        { status: 500 }
      );
    }

    // If no config exists, return default
    if (!data) {
      const { defaultBrandConfig } = await import("@/lib/config/brand");
      return NextResponse.json(defaultBrandConfig);
    }

    // Transform database format to BrandConfig format
    const brandConfig: BrandConfig = {
      name: data.name,
      shortName: data.short_name,
      tagline: data.tagline,
      description: data.description,
      logo: {
        icon: data.logo_icon,
        alt: data.logo_alt,
      },
      colors: {
        primary: data.color_primary,
        secondary: data.color_secondary,
        accent: data.color_accent,
      },
      social: {
        twitter: data.social_twitter,
        linkedin: data.social_linkedin,
        facebook: data.social_facebook,
        instagram: data.social_instagram,
        youtube: data.social_youtube,
      },
      contact: {
        email: data.contact_email,
        phone: data.contact_phone,
        address: data.contact_address,
      },
    };

    return NextResponse.json(brandConfig);
  } catch (error) {
    console.error("Unexpected error fetching brand config:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// PUT /api/brand-config - Update brand configuration (Admin only)
export async function PUT(request: NextRequest) {
  try {
    const supabase = await createServerClient();

    // Check authentication
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    // Check if user is admin (you'll need to implement this based on your user roles system)
    const { data: userProfile, error: profileError } = await supabase
      .from("user_profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    if (profileError || userProfile?.role !== "admin") {
      return NextResponse.json(
        { error: "Admin access required" },
        { status: 403 }
      );
    }

    const brandConfig: BrandConfig = await request.json();

    // Validate the brand config structure
    if (!brandConfig.name || !brandConfig.colors?.primary) {
      return NextResponse.json(
        { error: "Invalid brand configuration format" },
        { status: 400 }
      );
    }

    // Transform BrandConfig format to database format
    const dbFormat = {
      name: brandConfig.name,
      short_name: brandConfig.shortName,
      tagline: brandConfig.tagline,
      description: brandConfig.description,
      logo_icon: brandConfig.logo.icon,
      logo_alt: brandConfig.logo.alt,
      color_primary: brandConfig.colors.primary,
      color_secondary: brandConfig.colors.secondary,
      color_accent: brandConfig.colors.accent,
      social_twitter: brandConfig.social?.twitter,
      social_linkedin: brandConfig.social?.linkedin,
      social_facebook: brandConfig.social?.facebook,
      social_instagram: brandConfig.social?.instagram,
      social_youtube: brandConfig.social?.youtube,
      contact_email: brandConfig.contact.email,
      contact_phone: brandConfig.contact?.phone,
      contact_address: brandConfig.contact?.address,
      updated_at: new Date().toISOString(),
      updated_by: user.id,
    };

    // Upsert the configuration
    const { error } = await supabase
      .from("brand_config")
      .upsert(dbFormat, { onConflict: "id" })
      .select()
      .single();

    if (error) {
      console.error("Error updating brand config:", error);
      return NextResponse.json(
        { error: "Failed to update brand configuration" },
        { status: 500 }
      );
    }

    // Return the updated configuration in the expected format
    return NextResponse.json(brandConfig);
  } catch (error) {
    console.error("Unexpected error updating brand config:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// DELETE /api/brand-config - Reset to default configuration (Admin only)
export async function DELETE() {
  try {
    const supabase = await createServerClient();

    // Check authentication and admin role (similar to PUT)
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    const { data: userProfile, error: profileError } = await supabase
      .from("user_profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    if (profileError || userProfile?.role !== "admin") {
      return NextResponse.json(
        { error: "Admin access required" },
        { status: 403 }
      );
    }

    // Delete current config to revert to defaults
    const { error } = await supabase.from("brand_config").delete().neq("id", 0); // Delete all records

    if (error) {
      console.error("Error resetting brand config:", error);
      return NextResponse.json(
        { error: "Failed to reset brand configuration" },
        { status: 500 }
      );
    }

    // Return the default configuration
    const { defaultBrandConfig } = await import("@/lib/config/brand");
    return NextResponse.json(defaultBrandConfig);
  } catch (error) {
    console.error("Unexpected error resetting brand config:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
