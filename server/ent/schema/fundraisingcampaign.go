package schema

import (
	"time"

	"entgo.io/ent"
	"entgo.io/ent/dialect"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
	"entgo.io/ent/schema/index"
)

// FundraisingCampaign holds the schema definition for the FundraisingCampaign entity.
type FundraisingCampaign struct {
	ent.Schema
}

// Fields of the FundraisingCampaign.
func (FundraisingCampaign) Fields() []ent.Field {
	return []ent.Field{
		field.String("slug").
			Unique(),
		field.JSON("title", map[string]string{}),
		field.JSON("description", map[string]interface{}{}),
		field.JSON("story", map[string]interface{}{}).
			Optional(),
		field.String("type").
			Default("general"),
		field.String("category").
			Optional(),
		field.Float("target_amount").
			SchemaType(map[string]string{dialect.Postgres: "decimal(12,2)"}),
		field.Float("current_amount").
			Default(0).
			SchemaType(map[string]string{dialect.Postgres: "decimal(12,2)"}),
		field.String("currency").
			Default("EUR"),
		field.Float("minimum_donation").
			SchemaType(map[string]string{dialect.Postgres: "decimal(10,2)"}).
			Optional(),
		field.Time("start_date"),
		field.Time("end_date").
			Optional(),
		field.Bool("is_active").
			Default(true),
		field.String("hero_image_url").
			Optional(),
		field.String("video_url").
			Optional(),
		field.JSON("gallery_images", []string{}),
		field.String("manager_id"). // Storing as a string for now
						Optional(),
		field.Bool("is_public").
			Default(true),
		field.Bool("allow_recurring").
			Default(true),
		field.Int("donor_count").
			Default(0),
		field.Int("share_count").
			Default(0),
		field.Int("view_count").
			Default(0),
		field.Time("created_at").
			Default(time.Now).
			Immutable(),
		field.Time("updated_at").
			Default(time.Now).
			UpdateDefault(time.Now),
	}
}

// Edges of the FundraisingCampaign.
func (FundraisingCampaign) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("program", Program.Type).
			Ref("fundraising_campaigns").
			Unique(),
		// Self-referencing edge for peer-to-peer campaigns.
		edge.To("parent_campaign", FundraisingCampaign.Type).
			Unique().
			From("child_campaigns"),
		edge.To("donations", Donation.Type),
	}
}

// Indexes of the FundraisingCampaign.
func (FundraisingCampaign) Indexes() []ent.Index {
	return []ent.Index{
		index.Fields("is_active", "start_date", "end_date"),
		index.Edges("program"),
		index.Edges("parent_campaign"),
	}
}
