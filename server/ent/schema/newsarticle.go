package schema

import (
	"time"

	"entgo.io/ent"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
)

// NewsArticle holds the schema definition for the NewsArticle entity.
type NewsArticle struct {
	ent.Schema
}

// Fields of the NewsArticle.
func (NewsArticle) Fields() []ent.Field {
	return []ent.Field{
		field.String("slug").
			Unique(),
		field.JSON("title", map[string]string{}),
		field.JSON("content", map[string]interface{}{}), // Rich text
		field.JSON("excerpt", map[string]string{}).
			Optional(),
		field.String("featured_image_url").
			Optional(),
		field.Enum("status").
			Values("DRAFT", "REVIEW", "PUBLISHED", "ARCHIVED").
			Default("DRAFT"),
		field.Time("published_at").
			Optional(),
		field.Time("created_at").
			Default(time.Now).
			Immutable(),
		field.Time("updated_at").
			Default(time.Now).
			UpdateDefault(time.Now),
	}
}

// Edges of the NewsArticle.
func (NewsArticle) Edges() []ent.Edge {
	return []ent.Edge{
		// An article must have an author.
		edge.From("author", User.Type).
			Ref("news_articles").
			Unique().
			Required(),
		// We'll define ContentMedia later.
	}
}
