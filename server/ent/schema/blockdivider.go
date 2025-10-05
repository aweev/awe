package schema

import (
	"time"

	"entgo.io/ent"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
)

type BlockDivider struct {
	ent.Schema
}

func (BlockDivider) Fields() []ent.Field {
	return []ent.Field{
		field.String("internal_name"),
		field.Int("height").Default(1).Optional(),
		field.String("color").Optional(),
		field.String("style").Default("solid").Optional(),
		field.Time("created_at").Default(time.Now).Immutable(),
		field.Time("updated_at").Default(time.Now).UpdateDefault(time.Now),
	}
}

func (BlockDivider) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("content_block", ContentBlock.Type).Ref("block_divider").Unique().Required(),
	}
}
