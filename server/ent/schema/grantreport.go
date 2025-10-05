package schema

import (
	"time"

	"entgo.io/ent"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
)

type GrantReport struct {
	ent.Schema
}

func (GrantReport) Fields() []ent.Field {
	return []ent.Field{
		field.String("title"),
		field.Time("due_date"),
		field.Time("submitted_date").Optional(),
		field.Enum("status").Values("PENDING", "SUBMITTED", "REVIEWING", "APPROVED").Default("PENDING"),
		field.String("document_url").Optional(),
		field.String("report_type").Default("progress"),
		field.String("reviewed_by").Optional(),
		field.Time("reviewed_at").Optional(),
		field.Text("feedback").Optional(),
		field.Bool("is_approved").Default(false),
		field.Time("next_due_date").Optional(),
		field.Time("created_at").Default(time.Now).Immutable(),
		field.Time("updated_at").Default(time.Now).UpdateDefault(time.Now),
	}
}
func (GrantReport) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("grant", Grant.Type).Ref("reports").Unique().Required(),
	}
}
