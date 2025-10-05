package schema

import (
	"time"

	"entgo.io/ent"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
	"entgo.io/ent/schema/index"
)

// MentorshipRequest holds the schema definition for the MentorshipRequest entity.
type MentorshipRequest struct {
	ent.Schema
}

// Fields of the MentorshipRequest.
func (MentorshipRequest) Fields() []ent.Field {
	return []ent.Field{
		field.Enum("status").
			Values("REQUESTED", "MATCHED", "ACTIVE", "COMPLETED", "PAUSED", "CANCELLED").
			Default("REQUESTED"),
		field.JSON("goals", []string{}),
		field.JSON("preferences", map[string]string{}),
		field.String("duration"), // e.g., "3 months"
		field.Time("matched_at").
			Optional(),
		field.String("matched_by").
			Optional(),
		field.Text("match_reason").
			Optional(),
		field.Int("sessions_completed").
			Default(0),
		field.Time("last_session_date").
			Optional(),
		field.Time("next_session_date").
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

// Edges of the MentorshipRequest.
func (MentorshipRequest) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("requester", User.Type).
			Ref("mentorship_requests").
			Unique().
			Required(),
		edge.From("mentor", User.Type).
			Ref("mentorships_mentoring").
			Unique(), // Optional
		edge.To("sessions", MentorshipSession.Type),
	}
}

// Indexes of the MentorshipRequest.
func (MentorshipRequest) Indexes() []ent.Index {
	return []ent.Index{
		index.Edges("requester"),
		index.Edges("mentor"),
		index.Fields("status"),
	}
}
