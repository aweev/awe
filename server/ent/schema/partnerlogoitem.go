package schema

import (
	"entgo.io/ent"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
	"entgo.io/ent/schema/index"
)

// PartnerLogoItem holds the schema definition for the PartnerLogoItem entity.
type PartnerLogoItem struct {
	ent.Schema
}

// Fields of the PartnerLogoItem.
func (PartnerLogoItem) Fields() []ent.Field {
	return []ent.Field{
		field.Int("order"),
		field.String("name"),
		field.String("logo_url"),
		field.String("website").
			Optional(),
	}
}

// Edges of the PartnerLogoItem.
func (PartnerLogoItem) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("block", BlockPartnerLogos.Type).
			Ref("partners").
			Unique().
			Required(),
	}
}

// Indexes of the PartnerLogoItem.
func (PartnerLogoItem) Indexes() []ent.Index {
	return []ent.Index{
		index.Edges("block").Fields("order"),
	}
}
