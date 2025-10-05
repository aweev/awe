package schema

import (
	"time"

	"entgo.io/ent"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
)

// BlockMap holds the schema definition for the BlockMap entity.
type BlockMap struct {
	ent.Schema
}

// Fields of the BlockMap.
func (BlockMap) Fields() []ent.Field {
	return []ent.Field{
		field.String("internal_name"),
		field.Float("latitude"),
		field.Float("longitude"),
		field.Int("zoom").
			Default(12),
		field.JSON("markers", []map[string]interface{}{}).
			Optional(),
		field.Time("created_at").
			Default(time.Now).
			Immutable(),
		field.Time("updated_at").
			Default(time.Now).
			UpdateDefault(time.Now),
	}
}

// Edges of the BlockMap.
func (BlockMap) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("content_block", ContentBlock.Type).
			Ref("block_map").
			Unique().
			Required(),
	}
}
