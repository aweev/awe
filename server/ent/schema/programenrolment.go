package schema

import (
	"time"

	"entgo.io/ent"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
	"entgo.io/ent/schema/index"
)

// ProgramEnrolment holds the schema definition for the ProgramEnrolment entity.
type ProgramEnrolment struct {
	ent.Schema
}

// Fields of the ProgramEnrolment.
func (ProgramEnrolment) Fields() []ent.Field {
	return []ent.Field{
		field.Enum("status").
			Values("DRAFT", "ELIGIBLE", "INELIGIBLE", "SUBMITTED", "ACCEPTED", "REJECTED", "WAITLISTED").
			Default("DRAFT"),
		field.JSON("answers", map[string]interface{}{}).
			Optional(),
		field.Time("created_at").
			Default(time.Now).
			Immutable(),
		field.Time("updated_at").
			Default(time.Now).
			UpdateDefault(time.Now),
	}
}

// Edges of the ProgramEnrolment.
func (ProgramEnrolment) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("program", Program.Type).
			Ref("enrolments").
			Unique().
			Required(),
		edge.From("user", User.Type).
			Ref("program_enrolments").
			Unique().
			Required(),
	}
}

// Indexes of the ProgramEnrolment.
func (ProgramEnrolment) Indexes() []ent.Index {
	return []ent.Index{
		// A user can only have one enrolment record per program.
		index.Edges("program", "user").
			Unique(),
	}
}
