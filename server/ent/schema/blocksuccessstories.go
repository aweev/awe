package schema

import (
	"time"

	"entgo.io/ent"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
)

// BlockSuccessStories holds the schema definition for the BlockSuccessStories entity.
type BlockSuccessStories struct {
	ent.Schema
}

// Fields of the BlockSuccessStories.
func (BlockSuccessStories) Fields() []ent.Field {
	return []ent.Field{
		field.String("internal_name"),
		field.JSON("badge", map[string]string{}).
			Optional(),
		field.JSON("title", map[string]string{}).
			Optional(),
		field.JSON("description", map[string]string{}).
			Optional(),
		field.String("layout").
			Default("carousel"),
		field.Int("max_items").
			Default(6),
		field.Bool("autoplay").
			Default(true),
		field.String("program_filter"). // We can use a Program slug or ID here later
						Optional(),
		field.Time("created_at").
			Default(time.Now).
			Immutable(),
		field.Time("updated_at").
			Default(time.Now).
			UpdateDefault(time.Now),
	}
}

// Edges of the BlockSuccessStories.
func (BlockSuccessStories) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("content_block", ContentBlock.Type).
			Ref("block_success_stories").
			Unique().
			Required(),
	}
}
