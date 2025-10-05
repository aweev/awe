package schema

import (
	"time"

	"entgo.io/ent"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
)

// BlockDonationForm holds the schema definition for the BlockDonationForm entity.
type BlockDonationForm struct {
	ent.Schema
}

// Fields of the BlockDonationForm.
func (BlockDonationForm) Fields() []ent.Field {
	return []ent.Field{
		field.String("internal_name"),
		field.JSON("title", map[string]string{}),
		field.JSON("description", map[string]string{}).
			Optional(),
		field.Bool("show_amount_buttons").
			Default(true),
		field.JSON("default_amounts", []int{25, 50, 100, 250}),
		field.Bool("allow_custom_amount").
			Default(true),
		field.Bool("show_recurring").
			Default(true),
		field.Enum("color_scheme").
			Values("DEFAULT", "PRIMARY", "SECONDARY", "ACCENT", "LIGHT", "DARK").
			Default("PRIMARY"),
		field.Time("created_at").
			Default(time.Now).
			Immutable(),
		field.Time("updated_at").
			Default(time.Now).
			UpdateDefault(time.Now),
	}
}

// Edges of the BlockDonationForm.
func (BlockDonationForm) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("content_block", ContentBlock.Type).
			Ref("block_donation_form").
			Unique().
			Required(),
	}
}
