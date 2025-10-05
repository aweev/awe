package schema

import (
	"entgo.io/ent"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
)

// Agenda holds the schema definition for the Agenda entity.
type Agenda struct {
	ent.Schema
}

// Fields of the Agenda.
func (Agenda) Fields() []ent.Field {
	return []ent.Field{
		field.String("status").
			Default("draft"), // draft, finalized
	}
}

// Edges of the Agenda.
func (Agenda) Edges() []ent.Edge {
	return []ent.Edge{
		// An Agenda is associated with one Event.
		edge.From("event", Event.Type).
			Ref("agenda").
			Unique().
			Required(),
		// An Agenda has many items.
		edge.To("items", AgendaItem.Type),
		// An agenda can also be used for a mentorship session.
		edge.From("mentorship_session", MentorshipSession.Type).
			Ref("agenda").
			Unique(),
	}
}
