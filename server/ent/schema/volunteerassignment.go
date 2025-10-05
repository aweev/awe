package schema

import (
	"time"

	"entgo.io/ent"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
	"entgo.io/ent/schema/index"
)

// VolunteerAssignment holds the schema definition for the VolunteerAssignment entity.
type VolunteerAssignment struct {
	ent.Schema
}

// Fields of the VolunteerAssignment.
func (VolunteerAssignment) Fields() []ent.Field {
	return []ent.Field{
		field.String("status").
			Default("active"),
		field.Time("start_date"),
		field.Time("end_date").
			Optional(),
		field.Int("hours_completed").
			Default(0),
		field.Int("hours_committed").
			Default(0),
		field.Text("feedback").
			Optional(),
		field.Int("rating").
			Min(1).
			Max(5).
			Optional(),
		field.Text("completion_notes").
			Optional(),
		field.Time("created_at").
			Default(time.Now).
			Immutable(),
		field.Time("updated_at").
			Default(time.Now).
			UpdateDefault(time.Now),
	}
}

// Edges of the VolunteerAssignment.
func (VolunteerAssignment) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("opportunity", VolunteerOpportunity.Type).
			Ref("assignments").
			Unique().
			Required(),
		edge.From("volunteer", UserProfile.Type).
			Ref("assignments").
			Unique().
			Required(),
	}
}

// Indexes of the VolunteerAssignment.
func (VolunteerAssignment) Indexes() []ent.Index {
	return []ent.Index{
		index.Edges("opportunity", "volunteer").
			Unique(),
		index.Edges("volunteer"),
	}
}
