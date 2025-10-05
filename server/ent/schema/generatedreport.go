package schema

import (
	"time"

	"entgo.io/ent"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
	"entgo.io/ent/schema/index"
)

// GeneratedReport holds the schema definition for the GeneratedReport entity.
type GeneratedReport struct {
	ent.Schema
}

// Fields of the GeneratedReport.
func (GeneratedReport) Fields() []ent.Field {
	return []ent.Field{
		field.String("status"), // GENERATING, COMPLETED, FAILED
		field.Enum("format").
			Values("PDF", "CSV", "XLSX", "JSON"),
		field.String("file_url").
			Optional(),
		field.Int("file_size").
			Optional(),
		field.JSON("parameters", map[string]interface{}{}).
			Optional(),
		field.Enum("delivery_method").
			Values("EMAIL", "IN_APP", "DOWNLOAD", "WEBHOOK"),
		field.String("recipient_email").
			Optional(),
		field.Time("generated_at").
			Default(time.Now),
		field.String("error").
			Optional(),
		field.JSON("metadata", map[string]interface{}{}).
			Optional(),
	}
}

// Edges of the GeneratedReport.
func (GeneratedReport) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("report_definition", ReportDefinition.Type).
			Ref("generated_reports").
			Unique().
			Required(),
		edge.From("generator", User.Type).
			Ref("generated_reports").
			Unique().
			Required(),
		// We use a one-to-one edge to link to the job.
		edge.From("job", Job.Type).
			Ref("reports"). // Let's name the back-reference 'reports'
			Unique(),
	}
}

// Indexes of the GeneratedReport.
func (GeneratedReport) Indexes() []ent.Index {
	return []ent.Index{
		index.Edges("report_definition").Fields("status"),
		index.Edges("generator"),
		index.Fields("generated_at"),
	}
}
