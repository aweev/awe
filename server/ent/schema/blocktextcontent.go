package schema

import (
	"time"

	"entgo.io/ent"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
)

// BlockTextContent holds the schema definition for the BlockTextContent entity.
type BlockTextContent struct {
	ent.Schema
}

// Fields of the BlockTextContent.
func (BlockTextContent) Fields() []ent.Field {
	return []ent.Field{
		field.String("internal_name"),
		field.JSON("content", map[string]string{}), // Will store rich text/HTML
		field.Enum("text_align").
			Values("LEFT", "CENTER", "RIGHT", "JUSTIFY").
			Default("LEFT"),
		field.Enum("color_scheme").
			Values("DEFAULT", "PRIMARY", "SECONDARY", "ACCENT", "LIGHT", "DARK").
			Default("DEFAULT"),
		field.String("max_width").
			Default("prose").
			Optional(),
		field.Time("created_at").
			Default(time.Now).
			Immutable(),
		field.Time("updated_at").
			Default(time.Now).
			UpdateDefault(time.Now),
	}
}

// Edges of the BlockTextContent.
func (BlockTextContent) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("content_block", ContentBlock.Type).
			Ref("block_text_content").
			Unique().
			Required(),
	}
}
