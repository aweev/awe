package schema

import (
	"time"

	"entgo.io/ent"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
	"entgo.io/ent/schema/index"
)

// FaqItem holds the schema definition for the FaqItem entity.
type FaqItem struct {
	ent.Schema
}

// Fields of the FaqItem.
func (FaqItem) Fields() []ent.Field {
	return []ent.Field{
		field.Int("order"),
		field.JSON("question", map[string]string{}),
		field.JSON("answer", map[string]string{}),
		field.Time("created_at").
			Default(time.Now).
			Immutable(),
		field.Time("updated_at").
			Default(time.Now).
			UpdateDefault(time.Now),
	}
}

// Edges of the FaqItem.
func (FaqItem) Edges() []ent.Edge {
	return []ent.Edge{
		// An item must belong to a single FAQ block.
		edge.From("block", BlockFaq.Type).
			Ref("items").
			Unique().
			Required(),
	}
}

// Indexes of the FaqItem.
func (FaqItem) Indexes() []ent.Index {
	return []ent.Index{
		index.Edges("block").Fields("order"),
	}
}
