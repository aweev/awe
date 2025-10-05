package schema

import (
	"time"

	"entgo.io/ent"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
)

// BlockContactForm holds the schema definition for the BlockContactForm entity.
type BlockContactForm struct {
	ent.Schema
}

// Fields of the BlockContactForm.
func (BlockContactForm) Fields() []ent.Field {
	return []ent.Field{
		field.String("internal_name"),
		field.JSON("title", map[string]string{}),
		field.JSON("description", map[string]string{}).
			Optional(),
		field.Bool("show_name_field").
			Default(true),
		field.Bool("show_phone_field").
			Default(false),
		field.Bool("show_subject_field").
			Default(true),
		field.Bool("show_organization_field").
			Default(false),
		field.String("recipient_email"),
		field.JSON("success_message", map[string]string{}),
		field.Time("created_at").
			Default(time.Now).
			Immutable(),
		field.Time("updated_at").
			Default(time.Now).
			UpdateDefault(time.Now),
	}
}

// Edges of the BlockContactForm.
func (BlockContactForm) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("content_block", ContentBlock.Type).
			Ref("block_contact_form").
			Unique().
			Required(),
		// We can add custom fields if the design requires it, though this is not in the Prisma schema.
	}
}
