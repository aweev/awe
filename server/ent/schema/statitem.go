package schema

import (
	"entgo.io/ent"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
	"entgo.io/ent/schema/index"
)

// StatItem holds the schema definition for the StatItem entity.
type StatItem struct {
	ent.Schema
}

// Fields of the StatItem.
func (StatItem) Fields() []ent.Field {
	return []ent.Field{
		field.Int("order"),
		field.String("value"),
		field.JSON("label", map[string]string{}),
		field.JSON("description", map[string]string{}).
			Optional(),
		field.String("icon_name").
			Optional(),
		field.String("color").
			Optional(),
	}
}

// Edges of the StatItem.
func (StatItem) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("block", BlockStats.Type).
			Ref("stats").
			Unique().
			Required(),
	}
}

// Indexes of the StatItem.
func (StatItem) Indexes() []ent.Index {
	return []ent.Index{
		index.Edges("block").Fields("order"),
	}
}
