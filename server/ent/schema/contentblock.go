package schema

import (
	"time"

	"entgo.io/ent"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
	"entgo.io/ent/schema/index"
)

// ContentBlock holds the schema definition for the ContentBlock entity.
type ContentBlock struct {
	ent.Schema
}

// Fields of the ContentBlock.
func (ContentBlock) Fields() []ent.Field {
	return []ent.Field{
		field.Int("order"),
		field.Enum("block_type").
			Values(
				"HERO", "FAQ", "CTA", "TESTIMONIALS", "STATS", "GALLERY",
				"TEXT_CONTENT", "PROGRAM_CARDS", "SUCCESS_STORIES", "DONATION_FORM",
				"VOLUNTEER_SIGNUP", "NEWSLETTER_SIGNUP", "PARTNER_LOGOS", "TEAM_GRID",
				"TIMELINE", "CONTACT_FORM", "VIDEO_EMBED", "MAP", "ACCORDION",
				"TABS", "DIVIDER",
			),
		field.JSON("config", map[string]interface{}{}).
			Optional(),
		field.Bool("is_visible").
			Default(true),
		field.Bool("hide_on_mobile").
			Default(false),
		field.Bool("hide_on_tablet").
			Default(false),
		field.Bool("hide_on_desktop").
			Default(false),
		field.Time("created_at").
			Default(time.Now).
			Immutable(),
		field.Time("updated_at").
			Default(time.Now).
			UpdateDefault(time.Now),
	}
}

// Edges of the ContentBlock.
func (ContentBlock) Edges() []ent.Edge {
	return []ent.Edge{
		// A content block must belong to a single page.
		edge.From("page", Page.Type).
			Ref("blocks").
			Unique().
			Required(),

		// Each block will have an optional one-to-one edge to its specific data model.
		// We will add these as we define each block type (BlockHero, BlockFaq, etc.).
		edge.To("block_hero", BlockHero.Type).
			Unique(),
		edge.To("block_text_content", BlockTextContent.Type).
			Unique(),
		edge.To("block_faq", BlockFaq.Type).
			Unique(),
		edge.To("block_cta", BlockCta.Type).
			Unique(),
		edge.To("block_testimonials", BlockTestimonials.Type).
			Unique(),
		edge.To("block_stats", BlockStats.Type).
			Unique(),
		edge.To("block_gallery", BlockGallery.Type).
			Unique(),
		edge.To("block_program_cards", BlockProgramCards.Type).
			Unique(),
		edge.To("block_success_stories", BlockSuccessStories.Type).
			Unique(),
		edge.To("block_donation_form", BlockDonationForm.Type).
			Unique(),
		edge.To("block_volunteer_signup", BlockVolunteerSignup.Type).
			Unique(),
		edge.To("block_newsletter_signup", BlockNewsletterSignup.Type).
			Unique(),
		edge.To("block_partner_logos", BlockPartnerLogos.Type).
			Unique(),
		edge.To("block_team_grid", BlockTeamGrid.Type).
			Unique(),
		edge.To("block_timeline", BlockTimeline.Type).
			Unique(),
		edge.To("block_contact_form", BlockContactForm.Type).
			Unique(),
		edge.To("block_video_embed", BlockVideoEmbed.Type).
			Unique(),
		edge.To("block_map", BlockMap.Type).
			Unique(),
		edge.To("block_accordion", BlockAccordion.Type).Unique(),
		edge.To("block_tabs", BlockTabs.Type).Unique(),
		edge.To("block_divider", BlockDivider.Type).Unique(),
	}
}

// Indexes of the ContentBlock.
func (ContentBlock) Indexes() []ent.Index {
	return []ent.Index{
		index.Edges("page").Fields("order"),
	}
}
