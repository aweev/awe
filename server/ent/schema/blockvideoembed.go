package schema

import (
	"time"

	"entgo.io/ent"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
)

// BlockVideoEmbed holds the schema definition for the BlockVideoEmbed entity.
type BlockVideoEmbed struct {
	ent.Schema
}

// Fields of the BlockVideoEmbed.
func (BlockVideoEmbed) Fields() []ent.Field {
	return []ent.Field{
		field.String("internal_name"),
		field.JSON("badge", map[string]string{}).
			Optional(),
		field.JSON("title", map[string]string{}).
			Optional(),
		field.JSON("description", map[string]string{}).
			Optional(),
		field.String("video_url"),
		field.String("thumbnail_url").
			Optional(),
		field.String("aspect_ratio").
			Default("16/9"),
		field.Bool("autoplay").
			Default(false),
		field.Bool("show_controls").
			Default(true),
		field.Time("created_at").
			Default(time.Now).
			Immutable(),
		field.Time("updated_at").
			Default(time.Now).
			UpdateDefault(time.Now),
	}
}

// Edges of the BlockVideoEmbed.
func (BlockVideoEmbed) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("content_block", ContentBlock.Type).
			Ref("block_video_embed").
			Unique().
			Required(),
	}
}
