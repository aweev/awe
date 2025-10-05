package schema

import (
	"time"

	"entgo.io/ent"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
)

type BlockTabs struct {
	ent.Schema
}

func (BlockTabs) Fields() []ent.Field {
	return []ent.Field{
		field.String("internal_name"),
		field.Time("created_at").Default(time.Now).Immutable(),
		field.Time("updated_at").Default(time.Now).UpdateDefault(time.Now),
	}
}

func (BlockTabs) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("content_block", ContentBlock.Type).Ref("block_tabs").Unique().Required(),
		edge.To("items", TabItem.Type),
	}
}
