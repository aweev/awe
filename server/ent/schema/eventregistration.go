package schema

import (
	"time"

	"entgo.io/ent"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
	"entgo.io/ent/schema/index"
)

// EventRegistration holds the schema definition for the EventRegistration entity.
type EventRegistration struct {
	ent.Schema
}

// Fields of the EventRegistration.
func (EventRegistration) Fields() []ent.Field {
	return []ent.Field{
		field.Enum("status").
			Values("CONFIRMED", "WAITLISTED", "CANCELLED").
			Default("CONFIRMED"),
		field.Enum("attendance_status").
			Values("REGISTERED", "ATTENDED", "NO_SHOW").
			Default("REGISTERED"),
		field.JSON("registration_data", map[string]interface{}{}).
			Optional(),
		field.JSON("feedback", map[string]interface{}{}).
			Optional(),
		field.Time("created_at").
			Default(time.Now).
			Immutable(),
		field.Time("updated_at").
			Default(time.Now).
			UpdateDefault(time.Now),
	}
}

// Edges of the EventRegistration.
func (EventRegistration) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("event", Event.Type).
			Ref("registrations").
			Unique().
			Required(),
		edge.From("user", User.Type).
			Ref("event_registrations").
			Unique().
			Required(),
	}
}

// Indexes of the EventRegistration.
func (EventRegistration) Indexes() []ent.Index {
	return []ent.Index{
		index.Edges("event", "user").
			Unique(),
		index.Fields("status"),
	}
}
