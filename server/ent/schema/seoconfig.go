package schema

import (
	"time"

	"entgo.io/ent"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
)

// SeoConfig holds the schema definition for the SeoConfig entity.
type SeoConfig struct {
	ent.Schema
}

// Fields of the SeoConfig.
func (SeoConfig) Fields() []ent.Field {
	return []ent.Field{
		field.JSON("meta_title", map[string]string{}),
		field.JSON("meta_description", map[string]string{}).
			Optional(),
		field.JSON("keywords", map[string][]string{}).
			Optional(),
		field.JSON("og_title", map[string]string{}).
			Optional(),
		field.JSON("og_description", map[string]string{}).
			Optional(),
		field.String("og_image_url").
			Optional(),
		field.String("og_type").
			Default("website"),
		field.String("twitter_card").
			Default("summary_large_image"),
		field.JSON("twitter_title", map[string]string{}).
			Optional(),
		field.JSON("twitter_description", map[string]string{}).
			Optional(),
		field.String("twitter_image_url").
			Optional(),
		field.String("canonical_url").
			Optional(),
		field.Bool("noindex").
			Default(false),
		field.Bool("nofollow").
			Default(false),
		field.JSON("structured_data", map[string]interface{}{}).
			Optional(),
		field.Time("updated_at").
			Default(time.Now).
			UpdateDefault(time.Now),
	}
}

// Edges of the SeoConfig.
func (SeoConfig) Edges() []ent.Edge {
	return []ent.Edge{
		// An SEO config must belong to a single page.
		edge.From("page", Page.Type).
			Ref("seo").
			Unique().
			Required(),
	}
}
