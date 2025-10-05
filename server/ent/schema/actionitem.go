package schema

import (
	"time"

	"entgo.io/ent"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
)

// ActionItem holds the schema definition for the ActionItem entity.
type ActionItem struct {
	ent.Schema
}

// Fields of the ActionItem.
func (ActionItem) Fields() []ent.Field {
	return []ent.Field{
		field.Text("description"),
		field.String("owner_id"), // User ID of the owner
		field.Time("due_date").
			Optional(),
		field.String("status").
			Default("pending"), // pending, in-progress, completed
		field.Time("created_at").
			Default(time.Now).
			Immutable(),
		field.Time("completed_at").
			Optional(),
	}
}

// Edges of the ActionItem.
func (ActionItem) Edges() []ent.Edge {
	return []ent.Edge{
		// An action item can optionally originate from an agenda item.
		edge.From("agenda_item", AgendaItem.Type).
			Ref("action_items").
			Unique(),
	}
}
