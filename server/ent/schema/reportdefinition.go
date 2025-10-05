package schema

import (
	"time"

	"entgo.io/ent"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
	"entgo.io/ent/schema/index"
)

// ReportDefinition holds the schema definition for the ReportDefinition entity.
type ReportDefinition struct {
	ent.Schema
}

// Fields of the ReportDefinition.
func (ReportDefinition) Fields() []ent.Field {
	return []ent.Field{
		field.String("name"),
		field.String("slug").
			Unique(),
		field.Enum("type").
			Values("DONATION_SUMMARY", "PROGRAM_IMPACT", "FINANCIAL_OVERVIEW", "ENGAGEMENT_METRICS", "VOLUNTEER_HOURS", "PARTNERSHIP_ROI", "CUSTOM"),
		field.String("description").
			Optional(),
		field.JSON("query", map[string]interface{}{}).
			Optional(),
		field.JSON("parameters", []map[string]interface{}{}).
			Optional(),
		field.Bool("is_public").
			Default(false),
		field.Time("created_at").
			Default(time.Now).
			Immutable(),
		field.Time("updated_at").
			Default(time.Now).
			UpdateDefault(time.Now),
	}
}

// Edges of the ReportDefinition.
func (ReportDefinition) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("creator", User.Type).
			Ref("created_reports").
			Unique().
			Required(),
		edge.To("permissions", ReportPermission.Type),
		edge.To("generated_reports", GeneratedReport.Type),
		edge.To("schedules", ScheduledReport.Type),
	}
}

// Indexes of the ReportDefinition.
func (ReportDefinition) Indexes() []ent.Index {
	return []ent.Index{
		index.Fields("type"),
		index.Fields("slug"),
	}
}
