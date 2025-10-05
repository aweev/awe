package schema

import (
	"entgo.io/ent"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
)

// AgendaItem holds the schema definition for the AgendaItem entity.
type AgendaItem struct {
	ent.Schema
}

// Fields of the AgendaItem.
func (AgendaItem) Fields() []ent.Field {
	return []ent.Field{
		field.Int("order"),
		field.String("title"),
		field.String("presenter").
			Optional(),
		field.Text("notes").
			Optional(),
		field.Int("duration").
			Optional(), // in minutes
	}
}

// Edges of the AgendaItem.
func (AgendaItem) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("agenda", Agenda.Type).
			Ref("items").
			Unique().
			Required(),
		// An agenda item can have one vote associated with it.
		edge.To("vote", Vote.Type).
			Unique(),
		// An agenda item can result in multiple action items.
		edge.To("action_items", ActionItem.Type),
	}
}
