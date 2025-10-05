package schema

import (
	"entgo.io/ent"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
	"entgo.io/ent/schema/index"
)

// GalleryImage holds the schema definition for the GalleryImage entity.
type GalleryImage struct {
	ent.Schema
}

// Fields of the GalleryImage.
func (GalleryImage) Fields() []ent.Field {
	return []ent.Field{
		field.Int("order"),
		field.String("image_url"),
		field.Int("image_width").
			Optional(),
		field.Int("image_height").
			Optional(),
		field.JSON("alt_text", map[string]string{}),
		field.JSON("caption", map[string]string{}).
			Optional(),
	}
}

// Edges of the GalleryImage.
func (GalleryImage) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("block", BlockGallery.Type).
			Ref("images").
			Unique().
			Required(),
	}
}

// Indexes of the GalleryImage.
func (GalleryImage) Indexes() []ent.Index {
	return []ent.Index{
		index.Edges("block").Fields("order"),
	}
}
