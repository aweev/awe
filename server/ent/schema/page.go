package schema

import (
	"time"

	"entgo.io/ent"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
	"entgo.io/ent/schema/index"
)

// Page holds the schema definition for the Page entity.
type Page struct {
	ent.Schema
}

// Fields of the Page.
func (Page) Fields() []ent.Field {
	return []ent.Field{
		field.String("slug").
			Unique(),
		field.JSON("title", map[string]string{}), // Multi-language
		field.Enum("status").
			Values("DRAFT", "REVIEW", "PUBLISHED", "ARCHIVED").
			Default("DRAFT"),
		field.Time("published_at").
			Optional(),
		field.String("layout").
			Default("default"),
		field.Bool("is_homepage").
			Default(false),
		field.Time("created_at").
			Default(time.Now).
			Immutable(),
		field.Time("updated_at").
			Default(time.Now).
			UpdateDefault(time.Now),
	}
}

// Edges of the Page.
func (Page) Edges() []ent.Edge {
	return []ent.Edge{
		// A page can have a parent page (for hierarchy).
		edge.To("parent_page", Page.Type).
			Unique().
			From("child_pages"), // Inverse edge name.
		// A page is composed of many content blocks.
		edge.To("blocks", ContentBlock.Type),
		// A page has one SEO configuration.
		edge.To("seo", SeoConfig.Type).
			Unique(),
	}
}

// Indexes of the Page.
func (Page) Indexes() []ent.Index {
	return []ent.Index{
		index.Fields("slug"),
		index.Fields("status", "published_at"),
	}
}
