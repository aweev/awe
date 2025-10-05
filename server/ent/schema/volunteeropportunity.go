package schema

import (
	"time"

	"entgo.io/ent"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
	"entgo.io/ent/schema/index"
)

// VolunteerOpportunity holds the schema definition for the VolunteerOpportunity entity.
type VolunteerOpportunity struct {
	ent.Schema
}

// Fields of the VolunteerOpportunity.
func (VolunteerOpportunity) Fields() []ent.Field {
	return []ent.Field{
		field.JSON("title", map[string]string{}),
		field.JSON("description", map[string]string{}),
		field.String("time_commitment"),
		field.JSON("location", map[string]string{}),
		field.Bool("is_active").
			Default(true),
		field.Int("max_volunteers").
			Optional(),
		field.Int("current_volunteers").
			Default(0),
		field.Time("start_date").
			Optional(),
		field.Time("end_date").
			Optional(),
		field.Time("application_deadline").
			Optional(),
		field.JSON("required_skills", []string{}),
		field.JSON("preferred_skills", []string{}),
		field.JSON("tags", []string{}),
		field.Bool("is_urgent").
			Default(false),
		field.Bool("is_recurring").
			Default(false),
		field.Time("created_at").
			Default(time.Now).
			Immutable(),
		field.Time("updated_at").
			Default(time.Now).
			UpdateDefault(time.Now),
	}
}

// Edges of the VolunteerOpportunity.
func (VolunteerOpportunity) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("program", Program.Type).
			Ref("volunteer_opportunities").
			Unique().
			Required(),
		// This is a many-to-many relationship via the VolunteerApplication join table
		edge.To("interested_volunteers", VolunteerApplication.Type),
		edge.To("assignments", VolunteerAssignment.Type),
	}
}

// Indexes of the VolunteerOpportunity.
func (VolunteerOpportunity) Indexes() []ent.Index {
	return []ent.Index{
		index.Edges("program").Fields("is_active"),
	}
}
