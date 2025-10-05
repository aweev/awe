package schema

import (
	"time"

	"entgo.io/ent"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
)

// BlockTestimonials holds the schema definition for the BlockTestimonials entity.
type BlockTestimonials struct {
	ent.Schema
}

// Fields of the BlockTestimonials.
func (BlockTestimonials) Fields() []ent.Field {
	return []ent.Field{
		field.String("internal_name"),
		field.JSON("badge", map[string]string{}).
			Optional(),
		field.JSON("title", map[string]string{}),
		field.JSON("description", map[string]string{}).
			Optional(),
		field.String("layout").
			Default("carousel"),
		field.Int("items_per_row").
			Default(3),
		field.Bool("autoplay").
			Default(true),
		field.Int("autoplay_speed").
			Default(5000),
		field.Time("created_at").
			Default(time.Now).
			Immutable(),
		field.Time("updated_at").
			Default(time.Now).
			UpdateDefault(time.Now),
	}
}

// Edges of the BlockTestimonials.
func (BlockTestimonials) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("content_block", ContentBlock.Type).
			Ref("block_testimonials").
			Unique().
			Required(),
		edge.To("testimonials", TestimonialItem.Type),
	}
}
