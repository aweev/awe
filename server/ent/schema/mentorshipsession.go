package schema

import (
	"time"

	"entgo.io/ent"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
	"entgo.io/ent/schema/index"
)

// MentorshipSession holds the schema definition for the MentorshipSession entity.
type MentorshipSession struct {
	ent.Schema
}

// Fields of the MentorshipSession.
func (MentorshipSession) Fields() []ent.Field {
	return []ent.Field{
		field.Time("scheduled_at"),
		field.Int("duration").
			Default(60), // minutes
		field.String("format").
			Default("virtual"),
		field.String("status").
			Default("scheduled"),
		field.Text("notes").
			Optional(),
		field.JSON("action_items", []string{}).
			Optional(),
		field.Int("mentor_rating").
			Min(1).Max(5).Optional(),
		field.Int("mentee_rating").
			Min(1).Max(5).Optional(),
		field.Text("mentor_feedback").
			Optional(),
		field.Text("mentee_feedback").
			Optional(),
		field.Time("created_at").
			Default(time.Now).
			Immutable(),
		field.Time("updated_at").
			Default(time.Now).
			UpdateDefault(time.Now),
	}
}

// Edges of the MentorshipSession.
func (MentorshipSession) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("mentorship_request", MentorshipRequest.Type).
			Ref("sessions").
			Unique().
			Required(),
		edge.To("agenda", Agenda.Type).
			Unique(),
	}
}

// Indexes of the MentorshipSession.
func (MentorshipSession) Indexes() []ent.Index {
	return []ent.Index{
		index.Edges("mentorship_request"),
	}
}
