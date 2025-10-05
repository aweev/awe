package schema

import (
	"time"

	"entgo.io/ent"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
)

// BlockNewsletterSignup holds the schema definition for the BlockNewsletterSignup entity.
type BlockNewsletterSignup struct {
	ent.Schema
}

// Fields of the BlockNewsletterSignup.
func (BlockNewsletterSignup) Fields() []ent.Field {
	return []ent.Field{
		field.String("internal_name"),
		field.JSON("title", map[string]string{}),
		field.JSON("description", map[string]string{}).
			Optional(),
		field.JSON("button_text", map[string]string{}),
		field.Bool("show_name_field").
			Default(false),
		field.JSON("placeholder", map[string]string{}),
		field.String("layout").
			Default("horizontal"),
		field.Enum("color_scheme").
			Values("DEFAULT", "PRIMARY", "SECONDARY", "ACCENT", "LIGHT", "DARK").
			Default("DEFAULT"),
		field.Time("created_at").
			Default(time.Now).
			Immutable(),
		field.Time("updated_at").
			Default(time.Now).
			UpdateDefault(time.Now),
	}
}

// Edges of the BlockNewsletterSignup.
func (BlockNewsletterSignup) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("content_block", ContentBlock.Type).
			Ref("block_newsletter_signup").
			Unique().
			Required(),
	}
}
