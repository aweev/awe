package schema

import (
	"time"

	"entgo.io/ent"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
)

// BlockStats holds the schema definition for the BlockStats entity.
type BlockStats struct {
	ent.Schema
}

// Fields of the BlockStats.
func (BlockStats) Fields() []ent.Field {
	return []ent.Field{
		field.String("internal_name"),
		field.JSON("badge", map[string]string{}).
			Optional(),
		field.JSON("title", map[string]string{}).
			Optional(),
		field.JSON("description", map[string]string{}).
			Optional(),
		field.String("layout").
			Default("row"),
		field.Int("items_per_row").
			Default(4),
		field.Time("created_at").
			Default(time.Now).
			Immutable(),
		field.Time("updated_at").
			Default(time.Now).
			UpdateDefault(time.Now),
	}
}

// Edges of the BlockStats.
func (BlockStats) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("content_block", ContentBlock.Type).
			Ref("block_stats").
			Unique().
			Required(),
		edge.To("stats", StatItem.Type),
	}
}
