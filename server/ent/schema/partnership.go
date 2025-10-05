package schema

import (
	"time"

	"entgo.io/ent"
	"entgo.io/ent/dialect"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
	"entgo.io/ent/schema/index"
)

// Partnership holds the schema definition for the Partnership entity.
type Partnership struct {
	ent.Schema
}

// Fields of the Partnership.
func (Partnership) Fields() []ent.Field {
	return []ent.Field{
		field.String("slug").
			Unique(),
		field.JSON("name", map[string]string{}),
		field.Enum("type").
			Values("CORPORATE", "INSTITUTIONAL", "COMMUNITY", "GOVERNMENT", "NONPROFIT"),
		field.Enum("status").
			Values("PROSPECT", "ACTIVE", "RENEWED", "PAUSED", "ENDED").
			Default("PROSPECT"),
		field.JSON("description", map[string]interface{}{}),
		field.Float("value").
			SchemaType(map[string]string{dialect.Postgres: "decimal(12,2)"}).
			Optional(),
		field.String("currency").
			Default("EUR"),
		field.Time("start_date").
			Optional(),
		field.Time("end_date").
			Optional(),
		field.Time("renewal_date").
			Optional(),
		field.JSON("benefits", []string{}),
		field.JSON("deliverables", []string{}),
		field.JSON("requirements", []string{}),
		field.Time("last_contact").
			Optional(),
		field.Time("next_follow_up").
			Optional(),
		field.Time("created_at").
			Default(time.Now).
			Immutable(),
		field.Time("updated_at").
			Default(time.Now).
			UpdateDefault(time.Now),
	}
}

// Edges of the Partnership.
func (Partnership) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("organization", Organization.Type).
			Ref("partnerships").
			Unique().
			Required(),
		edge.From("manager", User.Type).
			Ref("managed_partnerships").
			Unique(),
		edge.From("primary_contacts", User.Type).
			Ref("partnership_contacts"),
		edge.To("reports", PartnershipReport.Type),
		edge.To("interactions", PartnershipInteraction.Type),
		edge.To("renewals", PartnershipRenewal.Type),
		edge.To("brand_benefits", BrandBenefit.Type),
	}
}

// Indexes of the Partnership.
func (Partnership) Indexes() []ent.Index {
	return []ent.Index{
		index.Fields("status"),
		index.Fields("type"),
		index.Fields("renewal_date"),
	}
}
