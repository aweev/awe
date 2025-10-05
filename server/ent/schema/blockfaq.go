package schema

import (
	"time"

	"entgo.io/ent"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
)

// BlockFaq holds the schema definition for the BlockFaq entity.
type BlockFaq struct {
	ent.Schema
}

// Fields of the BlockFaq.
func (BlockFaq) Fields() []ent.Field {
	return []ent.Field{
		field.String("internal_name"),
		field.JSON("badge", map[string]string{}).
			Optional(),
		field.JSON("title", map[string]string{}),
		field.JSON("description", map[string]string{}).
			Optional(),
		field.Bool("allow_multiple_open").
			Default(false),
		field.Bool("default_open_first").
			Default(true),
		field.Time("created_at").
			Default(time.Now).
			Immutable(),
		field.Time("updated_at").
			Default(time.Now).
			UpdateDefault(time.Now),
	}
}

// Edges of the BlockFaq.
func (BlockFaq) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("content_block", ContentBlock.Type).
			Ref("block_faq").
			Unique().
			Required(),
		// A FAQ block has many individual items.
		edge.To("items", FaqItem.Type),
	}
}
