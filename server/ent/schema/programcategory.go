package schema

import (
	"time"

	"entgo.io/ent"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
)

// ProgramCategory holds the schema definition for the ProgramCategory entity.
type ProgramCategory struct {
	ent.Schema
}

// Fields of the ProgramCategory.
func (ProgramCategory) Fields() []ent.Field {
	return []ent.Field{
		field.String("slug").
			Unique(),
		field.JSON("name", map[string]string{}),
		field.JSON("description", map[string]string{}).
			Optional(),
		field.String("icon_name").
			Optional(),
		field.Int("display_order").
			Default(0),
		field.String("color"),
		field.String("hero_image_url").
			Optional(),
		field.Time("created_at").
			Default(time.Now).
			Immutable(),
		field.Time("updated_at").
			Default(time.Now).
			UpdateDefault(time.Now),
	}
}

// Edges of the ProgramCategory.
func (ProgramCategory) Edges() []ent.Edge {
	return []ent.Edge{
		// A category can have many programs.
		edge.To("programs", Program.Type),
	}
}
