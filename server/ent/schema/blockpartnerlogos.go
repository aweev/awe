package schema

import (
	"time"

	"entgo.io/ent"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
)

// BlockPartnerLogos holds the schema definition for the BlockPartnerLogos entity.
type BlockPartnerLogos struct {
	ent.Schema
}

// Fields of the BlockPartnerLogos.
func (BlockPartnerLogos) Fields() []ent.Field {
	return []ent.Field{
		field.String("internal_name"),
		field.JSON("title", map[string]string{}).
			Optional(),
		field.JSON("description", map[string]string{}).
			Optional(),
		field.String("layout").
			Default("grid"),
		field.Int("items_per_row").
			Default(5),
		field.Bool("grayscale").
			Default(false),
		field.Time("created_at").
			Default(time.Now).
			Immutable(),
		field.Time("updated_at").
			Default(time.Now).
			UpdateDefault(time.Now),
	}
}

// Edges of the BlockPartnerLogos.
func (BlockPartnerLogos) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("content_block", ContentBlock.Type).
			Ref("block_partner_logos").
			Unique().
			Required(),
		edge.To("partners", PartnerLogoItem.Type),
	}
}
