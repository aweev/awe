package schema

import (
	"time"

	"entgo.io/ent"
	"entgo.io/ent/dialect"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
	"entgo.io/ent/schema/index"
)

// PartnershipRenewal holds the schema definition for the PartnershipRenewal entity.
type PartnershipRenewal struct {
	ent.Schema
}

// Fields of the PartnershipRenewal.
func (PartnershipRenewal) Fields() []ent.Field {
	return []ent.Field{
		field.Time("previous_end_date"),
		field.Time("new_end_date"),
		field.Float("renewal_value").
			SchemaType(map[string]string{dialect.Postgres: "decimal(12,2)"}).
			Optional(),
		field.JSON("renewal_terms", map[string]interface{}{}).
			Optional(),
		field.String("negotiated_by").
			Optional(),
		field.String("approved_by").
			Optional(),
		field.Time("approved_at").
			Optional(),
		field.Time("created_at").
			Default(time.Now).
			Immutable(),
		field.Time("updated_at").
			Default(time.Now).
			UpdateDefault(time.Now),
	}
}

// Edges of the PartnershipRenewal.
func (PartnershipRenewal) Edges() []ent.Edge {
	return []ent.Edge{
		// A renewal record must belong to a single partnership.
		edge.From("partnership", Partnership.Type).
			Ref("renewals").
			Unique().
			Required(),
	}
}

// Indexes of the PartnershipRenewal.
func (PartnershipRenewal) Indexes() []ent.Index {
	return []ent.Index{
		index.Edges("partnership"),
	}
}