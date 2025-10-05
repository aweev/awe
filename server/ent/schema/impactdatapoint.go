package schema

import (
	"time"

	"entgo.io/ent"
	"entgo.io/ent/dialect"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
)

type ImpactDataPoint struct {
	ent.Schema
}

func (ImpactDataPoint) Fields() []ent.Field {
	return []ent.Field{
		field.Float("value").SchemaType(map[string]string{dialect.Postgres: "decimal(14,2)"}),
		field.Time("recorded_at").Default(time.Now),
		field.String("recorded_by").Optional(),
		field.String("period").Optional(),
		field.Text("notes").Optional(),
		field.String("source").Optional(),
		field.Bool("is_verified").Default(false),
		field.String("verified_by").Optional(),
		field.Time("verified_at").Optional(),
		field.Time("created_at").Default(time.Now).Immutable(),
		field.Time("updated_at").Default(time.Now).UpdateDefault(time.Now),
	}
}

func (ImpactDataPoint) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("metric", ImpactMetric.Type).Ref("data_points").Unique().Required(),
	}
}
