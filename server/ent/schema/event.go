package schema

import (
	"time"

	"entgo.io/ent"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
	"entgo.io/ent/schema/index"
)

// Event holds the schema definition for the Event entity.
type Event struct {
	ent.Schema
}

// Fields of the Event.
func (Event) Fields() []ent.Field {
	return []ent.Field{
		field.JSON("title", map[string]string{}),
		field.JSON("description", map[string]interface{}{}),
		field.String("event_type"), // workshop, fundraiser, etc.
		field.Time("start_date"),
		field.Time("end_date"),
		// Location info will be an edge to an Address model later.
		field.Int("capacity").
			Optional(),
		field.Enum("status").
			Values("DRAFT", "PUBLISHED", "CANCELLED", "ARCHIVED").
			Default("DRAFT"),
		field.Bool("is_virtual").
			Default(false),
		field.String("meeting_url").
			Optional(),
		field.Bool("registration_required").
			Default(true),
		field.Time("registration_deadline").
			Optional(),
		field.Bool("requires_approval").
			Default(false),
		field.JSON("tags", []string{}),
		field.String("image_url").
			Optional(),
		field.Bool("corporate_volunteer_friendly").
			Default(false),
		field.Bool("alumni_only").
			Default(false),
		field.Bool("major_donor_only").
			Default(false),
		field.Time("created_at").
			Default(time.Now).
			Immutable(),
		field.Time("updated_at").
			Default(time.Now).
			UpdateDefault(time.Now),
	}
}

// Edges of the Event.
func (Event) Edges() []ent.Edge {
	return []ent.Edge{
		// An event can be related to a program.
		edge.From("program", Program.Type).
			Ref("events").
			Unique(),
		// An event is created by a user.
		edge.From("created_by", User.Type).
			Ref("created_events").
			Unique().
			Required(),
		// An event has many registrations.
		edge.To("registrations", EventRegistration.Type),
		edge.To("agenda", Agenda.Type).Unique(),
		edge.To("location", Address.Type).Unique(),
	}
}

// Indexes of the Event.
func (Event) Indexes() []ent.Index {
	return []ent.Index{
		index.Fields("start_date"),
		index.Fields("event_type"),
	}
}
