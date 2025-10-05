package schema

import (
	"time"

	"entgo.io/ent"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
)

// BlockCta holds the schema definition for the BlockCta entity.
type BlockCta struct {
	ent.Schema
}

// Fields of the BlockCta.
func (BlockCta) Fields() []ent.Field {
	return []ent.Field{
		field.String("internal_name"),
		field.JSON("badge", map[string]string{}).
			Optional(),
		field.JSON("title", map[string]string{}),
		field.JSON("description", map[string]string{}).
			Optional(),
		field.JSON("primary_button_text", map[string]string{}),
		field.String("primary_button_href"),
		field.Enum("primary_button_style").
			Values("PRIMARY", "SECONDARY", "OUTLINE", "TEXT").
			Default("PRIMARY"),
		field.JSON("secondary_button_text", map[string]string{}).
			Optional(),
		field.String("secondary_button_href").
			Optional(),
		field.Enum("secondary_button_style").
			Values("PRIMARY", "SECONDARY", "OUTLINE", "TEXT").
			Default("SECONDARY"),
		field.Enum("text_align").
			Values("LEFT", "CENTER", "RIGHT", "JUSTIFY").
			Default("CENTER"),
		field.Enum("color_scheme").
			Values("DEFAULT", "PRIMARY", "SECONDARY", "ACCENT", "LIGHT", "DARK").
			Default("PRIMARY"),
		field.Time("created_at").
			Default(time.Now).
			Immutable(),
		field.Time("updated_at").
			Default(time.Now).
			UpdateDefault(time.Now),
	}
}

// Edges of the BlockCta.
func (BlockCta) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("content_block", ContentBlock.Type).
			Ref("block_cta").
			Unique().
			Required(),
	}
}
