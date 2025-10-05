package schema

import (
	"time"

	"entgo.io/ent"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
	"entgo.io/ent/schema/index"
)

type PartnershipReport struct {
	ent.Schema
}

func (PartnershipReport) Fields() []ent.Field {
	return []ent.Field{
		field.String("report_period"),
		field.Time("generated_at").Default(time.Now),
		field.String("generated_by").Optional(),
		field.JSON("impact_metrics", map[string]interface{}{}),
		field.JSON("outcomes", []string{}),
		field.JSON("feedback", []string{}),
		field.String("report_url").Optional(),
		field.String("presentation_url").Optional(),
		field.Time("created_at").Default(time.Now).Immutable(),
		field.Time("updated_at").Default(time.Now).UpdateDefault(time.Now),
	}
}
func (PartnershipReport) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("partnership", Partnership.Type).Ref("reports").Unique().Required(),
	}
}
func (PartnershipReport) Indexes() []ent.Index {
	return []ent.Index{index.Edges("partnership")}
}
