package schema

import (
	"entgo.io/ent"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
)

// BlockHero holds the schema definition for the BlockHero entity.
type BlockHero struct {
	ent.Schema
}

// Fields of the BlockHero.
func (BlockHero) Fields() []ent.Field {
	return []ent.Field{
		field.String("internal_name"), // For CMS identification
		field.JSON("title", map[string]string{}),
		field.JSON("subtitle", map[string]string{}).
			Optional(),
		field.JSON("cta_buttons", []map[string]interface{}{}). // Array of { text, href, style }
									Optional(),
		field.String("background_image_url").
			Optional(),
		field.JSON("badge", map[string]string{}).
			Optional(),

		field.JSON("description", map[string]string{}).
			Optional(),

		field.Enum("text_align").
			Values("LEFT", "CENTER", "RIGHT", "JUSTIFY").
			Default("LEFT"),
		field.Enum("color_scheme").
			Values("DEFAULT", "PRIMARY", "SECONDARY", "ACCENT", "LIGHT", "DARK").
			Default("DEFAULT"),
		field.String("min_height").
			Default("500px").
			Optional(),
		field.String("background_video_url").
			Optional(),
		field.String("overlay_color").
			Optional(),
		field.Float("overlay_opacity").
			Default(0.5).
			Optional(),
	}
}

// Edges of the BlockHero.
func (BlockHero) Edges() []ent.Edge {
	return []ent.Edge{
		// A BlockHero is a type of ContentBlock.
		// This creates a one-to-one relationship.
		edge.From("content_block", ContentBlock.Type).
			Ref("block_hero").
			Unique().
			Required(),
	}
}
