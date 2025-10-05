package schema

import (
	"time"

	"entgo.io/ent"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
	"entgo.io/ent/schema/index"
)

// ScheduledReport holds the schema definition for the ScheduledReport entity.
type ScheduledReport struct {
	ent.Schema
}

// Fields of the ScheduledReport.
func (ScheduledReport) Fields() []ent.Field {
	return []ent.Field{
		field.String("frequency"), // daily, weekly, monthly, quarterly, yearly
		field.Int("day_of_week").
			Optional(),
		field.Int("day_of_month").
			Optional(),
		field.String("time").
			Optional(),
		field.String("timezone").
			Default("UTC"),
		field.JSON("recipients", []map[string]interface{}{}),
		field.Enum("format").
			Values("PDF", "CSV", "XLSX", "JSON"),
		field.JSON("parameters", map[string]interface{}{}).
			Optional(),
		field.Bool("is_active").
			Default(true),
		field.Time("last_run_at").
			Optional(),
		field.Time("next_run_at").
			Optional(),
		field.Time("created_at").
			Default(time.Now).
			Immutable(),
		field.Time("updated_at").
			Default(time.Now).
			UpdateDefault(time.Now),
	}
}

// Edges of the ScheduledReport.
func (ScheduledReport) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("report_definition", ReportDefinition.Type).
			Ref("schedules").
			Unique().
			Required(),
		edge.From("creator", User.Type).
			Ref("scheduled_reports").
			Unique().
			Required(),
	}
}

// Indexes of the ScheduledReport.
func (ScheduledReport) Indexes() []ent.Index {
	return []ent.Index{
		index.Fields("is_active", "next_run_at"),
		index.Edges("report_definition"),
	}
}
