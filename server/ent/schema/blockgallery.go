package schema

import (
	"time"

	"entgo.io/ent"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
)

// BlockGallery holds the schema definition for the BlockGallery entity.
type BlockGallery struct {
	ent.Schema
}

// Fields of the BlockGallery.
func (BlockGallery) Fields() []ent.Field {
	return []ent.Field{
		field.String("internal_name"),
		field.JSON("title", map[string]string{}).
			Optional(),
		field.JSON("description", map[string]string{}).
			Optional(),
		field.Enum("layout").
			Values("GRID", "MASONRY", "CAROUSEL", "SLIDER").
			Default("GRID"),
		field.Int("columns").
			Default(3),
		field.String("spacing").
			Default("1rem"),
		field.String("aspect_ratio").
			Default("16/9").
			Optional(),
		field.Time("created_at").
			Default(time.Now).
			Immutable(),
		field.Time("updated_at").
			Default(time.Now).
			UpdateDefault(time.Now),
	}
}

// Edges of the BlockGallery.
func (BlockGallery) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("content_block", ContentBlock.Type).
			Ref("block_gallery").
			Unique().
			Required(),
		edge.To("images", GalleryImage.Type),
	}
}
