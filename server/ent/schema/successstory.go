package schema

import (
	"time"

	"entgo.io/ent"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
)

// SuccessStory holds the schema definition for the SuccessStory entity.
type SuccessStory struct {
	ent.Schema
}

// Fields of the SuccessStory.
func (SuccessStory) Fields() []ent.Field {
	return []ent.Field{
		field.String("slug").
			Unique(),
		field.JSON("title", map[string]string{}),
		field.JSON("excerpt", map[string]string{}),
		field.JSON("content", map[string]interface{}{}), // Rich text
		field.Text("quote"),
		field.Enum("status").
			Values("DRAFT", "REVIEW", "PUBLISHED", "ARCHIVED").
			Default("DRAFT"),
		field.Time("published_at").
			Optional(),
		field.String("image_url").
			Optional(),
		field.Time("created_at").
			Default(time.Now).
			Immutable(),
		field.Time("updated_at").
			Default(time.Now).
			UpdateDefault(time.Now),
	}
}

// Edges of the SuccessStory.
func (SuccessStory) Edges() []ent.Edge {
	return []ent.Edge{
		// A story can have an author (a user).
		edge.From("author", User.Type).
			Ref("success_stories").
			Unique(), // Optional, so no .Required()
		// A story must be related to a program.
		edge.From("program", Program.Type).
			Ref("success_stories").
			Unique().
			Required(),
		// Back-reference for testimonials that link to this story.
		edge.To("testimonials", TestimonialItem.Type),
	}
}
