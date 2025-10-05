package schema

import (
	"time"

	"entgo.io/ent"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
	"entgo.io/ent/schema/index"
)

type TabItem struct {
	ent.Schema
}

func (TabItem) Fields() []ent.Field {
	return []ent.Field{
		field.Int("order"),
		field.JSON("title", map[string]string{}),
		field.JSON("content", map[string]string{}),
		field.Time("created_at").Default(time.Now).Immutable(),
		field.Time("updated_at").Default(time.Now).UpdateDefault(time.Now),
	}
}

func (TabItem) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("block", BlockTabs.Type).Ref("items").Unique().Required(),
	}
}

func (TabItem) Indexes() []ent.Index {
	return []ent.Index{index.Edges("block").Fields("order")}
}
