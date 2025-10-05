package schema

import (
	"time"

	"entgo.io/ent"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
	"entgo.io/ent/schema/index"
)

// ProgramParticipant holds the schema definition for the ProgramParticipant entity.
type ProgramParticipant struct {
	ent.Schema
}

// Fields of the ProgramParticipant.
func (ProgramParticipant) Fields() []ent.Field {
	return []ent.Field{
		field.String("status"), // e.g., active, completed, withdrawn
		field.Time("enrollment_date"),
		field.Time("completion_date").
			Optional(),
		field.JSON("outcomes", map[string]interface{}{}).
			Optional(),
		field.Text("notes").
			Optional(),
		field.Time("created_at").
			Default(time.Now).
			Immutable(),
		field.Time("updated_at").
			Default(time.Now).
			UpdateDefault(time.Now),
	}
}

// Edges of the ProgramParticipant.
func (ProgramParticipant) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("program", Program.Type).
			Ref("participants").
			Unique().
			Required(),
		edge.From("user", User.Type).
			Ref("participant_in").
			Unique().
			Required(),
	}
}

// Indexes of the ProgramParticipant.
func (ProgramParticipant) Indexes() []ent.Index {
	return []ent.Index{
		// A user can only be an active participant in a program once.
		index.Edges("program", "user").
			Unique(),
	}
}
