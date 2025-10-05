package schema

import (
	"time"

	"entgo.io/ent"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
	"entgo.io/ent/schema/index"
)

// ReportPermission holds the schema definition for the ReportPermission entity.
type ReportPermission struct {
	ent.Schema
}

// Fields of the ReportPermission.
func (ReportPermission) Fields() []ent.Field {
	return []ent.Field{
		// Prisma used roleId (String), we'll just store the role name directly.
		field.String("role_id").
			Optional(),
		field.Bool("can_view").
			Default(false),
		field.Bool("can_edit").
			Default(false),
		field.Bool("can_delete").
			Default(false),
		field.Bool("can_schedule").
			Default(false),
		field.Time("created_at").
			Default(time.Now).
			Immutable(),
	}
}

// Edges of the ReportPermission.
func (ReportPermission) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("report_definition", ReportDefinition.Type).
			Ref("permissions").
			Unique().
			Required(),
		edge.From("user", User.Type).
			Ref("report_permissions").
			Unique(), // A user can have one permission entry per report
	}
}

// Indexes of the ReportPermission.
func (ReportPermission) Indexes() []ent.Index {
	return []ent.Index{
		// Enforce that a user can only have one permission record per report definition.
		index.Edges("report_definition", "user").
			Unique(),
	}
}
