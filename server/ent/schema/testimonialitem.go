package schema

import (
	"entgo.io/ent"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
	"entgo.io/ent/schema/index"
)

// TestimonialItem holds the schema definition for the TestimonialItem entity.
type TestimonialItem struct {
	ent.Schema
}

// Fields of the TestimonialItem.
func (TestimonialItem) Fields() []ent.Field {
	return []ent.Field{
		field.Int("order"),
		field.JSON("quote", map[string]string{}),
		field.String("author_name"),
		field.JSON("author_role", map[string]string{}),
		field.String("author_image_url").
			Optional(),
	}
}

// Edges of the TestimonialItem.
func (TestimonialItem) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("block", BlockTestimonials.Type).
			Ref("testimonials").
			Unique().
			Required(),
		edge.To("success_story", SuccessStory.Type).Unique(),
	}
}

// Indexes of the TestimonialItem.
func (TestimonialItem) Indexes() []ent.Index {
	return []ent.Index{
		index.Edges("block").Fields("order"),
	}
}
