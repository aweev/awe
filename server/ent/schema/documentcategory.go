package schema

import (
	"time"

	"entgo.io/ent"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
)

type DocumentCategory struct {
	ent.Schema
}

func (DocumentCategory) Fields() []ent.Field {
	return []ent.Field{
		field.JSON("name", map[string]string{}),
		field.JSON("description", map[string]string{}).Optional(),
		field.String("slug").Unique(),
		field.Int("display_order").Default(0),
		field.Bool("is_active").Default(true),
		field.Time("created_at").Default(time.Now).Immutable(),
		field.Time("updated_at").Default(time.Now).UpdateDefault(time.Now),
	}
}

func (DocumentCategory) Edges() []ent.Edge {
	return []ent.Edge{
		edge.To("parent", DocumentCategory.Type).Unique().From("children"),
		edge.To("documents", Document.Type),
	}
}
