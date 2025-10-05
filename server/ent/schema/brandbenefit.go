package schema

import (
	"entgo.io/ent"
	"entgo.io/ent/dialect"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
)

type BrandBenefit struct {
	ent.Schema
}

func (BrandBenefit) Fields() []ent.Field {
	return []ent.Field{
		field.String("type"),
		field.String("description"),
		field.String("url").Optional(),
		field.Time("date"),
		field.Float("value").SchemaType(map[string]string{dialect.Postgres: "decimal(10,2)"}).Optional(),
	}
}
func (BrandBenefit) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("partnership", Partnership.Type).Ref("brand_benefits").Unique().Required(),
	}
}
