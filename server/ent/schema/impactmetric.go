package schema

import (
	"time"

	"entgo.io/ent"
	"entgo.io/ent/dialect"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
)

type ImpactMetric struct {
	ent.Schema
}

func (ImpactMetric) Fields() []ent.Field {
	return []ent.Field{
		field.JSON("name", map[string]string{}),
		field.Enum("type").Values("PARTICIPANTS_SERVED", "JOBS_CREATED", "BUSINESSES_STARTED", "GRADUATION_RATE", "VOLUNTEER_HOURS", "FUNDS_RAISED", "PARTNERSHIPS_FORMED"),
		field.String("unit"),
		field.Float("target_value").SchemaType(map[string]string{dialect.Postgres: "decimal(14,2)"}).Optional(),
		field.Float("current_value").SchemaType(map[string]string{dialect.Postgres: "decimal(14,2)"}).Default(0),
		field.Time("target_date").Optional(),
		field.String("calculation_method").Optional(),
		field.Bool("is_auto_calculated").Default(false),
		field.Time("last_calculated").Optional(),
		field.Int("display_order").Default(0),
		field.Bool("is_public").Default(true),
		field.Bool("show_on_dashboard").Default(false),
		field.Time("created_at").Default(time.Now).Immutable(),
		field.Time("updated_at").Default(time.Now).UpdateDefault(time.Now),
	}
}

func (ImpactMetric) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("program", Program.Type).Ref("impact_metrics").Unique().Required(),
		edge.To("data_points", ImpactDataPoint.Type),
	}
}
