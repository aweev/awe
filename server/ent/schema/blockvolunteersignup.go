package schema

import (
	"time"

	"entgo.io/ent"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
)

// BlockVolunteerSignup holds the schema definition for the BlockVolunteerSignup entity.
type BlockVolunteerSignup struct {
	ent.Schema
}

// Fields of the BlockVolunteerSignup.
func (BlockVolunteerSignup) Fields() []ent.Field {
	return []ent.Field{
		field.String("internal_name"),
		field.JSON("title", map[string]string{}),
		field.JSON("description", map[string]string{}).
			Optional(),
		field.Bool("show_skills_input").
			Default(true),
		field.Bool("show_availability").
			Default(true),
		field.Bool("require_background").
			Default(false),
		field.Time("created_at").
			Default(time.Now).
			Immutable(),
		field.Time("updated_at").
			Default(time.Now).
			UpdateDefault(time.Now),
	}
}

// Edges of the BlockVolunteerSignup.
func (BlockVolunteerSignup) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("content_block", ContentBlock.Type).
			Ref("block_volunteer_signup").
			Unique().
			Required(),
	}
}
