package schema

import (
	"time"

	"entgo.io/ent"
	"entgo.io/ent/dialect"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
)

type Grant struct {
	ent.Schema
}

func (Grant) Fields() []ent.Field {
	return []ent.Field{
		field.String("name"),
		field.Float("grant_amount").SchemaType(map[string]string{dialect.Postgres: "decimal(14,2)"}),
		field.Time("start_date"),
		field.Time("end_date"),
		field.Enum("status").Values("DRAFT", "ACTIVE", "COMPLETED", "CLOSED").Default("ACTIVE"),
		field.JSON("goals", []string{}),
		field.String("grant_reference").Optional(),
		field.String("contact_person").Optional(),
		field.String("contact_email").Optional(),
		field.Bool("renewal_eligible").Default(false),
		field.Time("next_review_date").Optional(),
		field.Bool("requires_matching").Default(false),
		field.Float("matching_amount").SchemaType(map[string]string{dialect.Postgres: "decimal(14,2)"}).Optional(),
		field.JSON("restrictions", []string{}).Optional(),
		field.JSON("reporting_schedule", map[string]string{}).Optional(),
		field.Time("created_at").Default(time.Now).Immutable(),
		field.Time("updated_at").Default(time.Now).UpdateDefault(time.Now),
	}
}
func (Grant) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("organization", Organization.Type).Ref("grants").Unique().Required(),
		edge.From("program", Program.Type).Ref("grants").Unique().Required(),
		edge.To("reports", GrantReport.Type),
	}
}
