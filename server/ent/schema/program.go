package schema

import (
	"time"

	"entgo.io/ent"
	"entgo.io/ent/dialect/entsql"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
)

// Program holds the schema definition for the Program entity.
type Program struct {
	ent.Schema
}

// Fields of the Program.
func (Program) Fields() []ent.Field {
	return []ent.Field{
		field.String("slug").
			Unique(),
		field.JSON("name", map[string]string{}),
		field.JSON("description", map[string]interface{}{}), // Can be rich text
		field.JSON("tagline", map[string]string{}),
		field.Enum("status").
			Values("DRAFT", "OPEN", "FULL", "CLOSED", "ARCHIVED").
			Default("DRAFT"),
		field.Time("start_date").
			Optional(),
		field.Time("end_date").
			Optional(),
		field.String("hero_image_url").
			Optional(),
		field.String("thumbnail_url").
			Optional(),
		field.String("video_thumbnail_url").
			Optional(),
		field.JSON("media_gallery", []string{}),
		field.JSON("tags", []string{}),
		field.JSON("metrics", []map[string]interface{}{}),
		field.JSON("curriculum", []map[string]interface{}{}),
		field.JSON("eligibility_criteria", []map[string]interface{}{}),
		field.JSON("application_steps", []map[string]interface{}{}),
		field.String("duration").
			Optional(),
		field.Int("capacity").
			Optional(),
		field.Time("application_deadline").
			Optional(),
		field.JSON("requirements", []string{}),
		field.Int("min_age").
			Optional(),
		field.Int("max_age").
			Optional(),
		field.JSON("required_docs", []string{}),
		field.Float("cost").
			Optional(),
		field.String("currency").
			Default("EUR"),
		field.JSON("rules", []string{}),
		field.JSON("steps", []map[string]interface{}{}),
		field.JSON("required_skills", []string{}),
		field.Time("created_at").
			Default(time.Now).
			Immutable(),
		field.Time("updated_at").
			Default(time.Now).
			UpdateDefault(time.Now),
	}
}

// Edges of the Program.
func (Program) Edges() []ent.Edge {
	return []ent.Edge{
		// A program belongs to one category.
		edge.From("category", ProgramCategory.Type).
			Ref("programs").
			Unique().
			Required(),
		// Program has many enrolments and participants (we will define these next).
		edge.To("enrolments", ProgramEnrolment.Type),
		edge.To("participants", ProgramParticipant.Type),
		// Relations to other systems we've already defined.
		edge.From("created_by", User.Type).
			Ref("created_programs").
			Unique(),
		edge.From("updated_by", User.Type).
			Ref("updated_programs").
			Unique(),
		// Back-reference for the ProgramCardItem.
		edge.To("program_card_items", ProgramCardItem.Type).
			Annotations(entsql.OnDelete(entsql.Cascade)),
		edge.To("events", Event.Type),
		edge.To("success_stories", SuccessStory.Type),
		edge.To("volunteer_opportunities", VolunteerOpportunity.Type),
		edge.To("fundraising_campaigns", FundraisingCampaign.Type),
		edge.To("donations", Donation.Type),
		edge.To("grants", Grant.Type),
		edge.To("site_visits", SiteVisit.Type),
		edge.To("impact_metrics", ImpactMetric.Type),
	}
}
