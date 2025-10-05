package schema

import (
	"time"

	"entgo.io/ent"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
	"entgo.io/ent/schema/index"
)

// Job holds the schema definition for the Job entity.
type Job struct {
	ent.Schema
}

// Fields of the Job.
func (Job) Fields() []ent.Field {
	return []ent.Field{
		field.String("type"), // e.g., "email.sendWelcome"
		field.Enum("status").
			Values("PENDING", "WAITING", "PROCESSING", "COMPLETED", "FAILED", "CANCELLED").
			Default("PENDING"),
		field.JSON("payload", map[string]interface{}{}).
			Optional(),
		field.JSON("result", map[string]interface{}{}).
			Optional(),
		field.String("error").
			Optional(),
		field.String("inngest_run_id").
			Optional().
			Unique(),
		field.Time("scheduled_for").
			Optional(),
		field.Int("priority").
			Default(0),
		field.Int("max_retries").
			Default(3),
		field.Time("created_at").
			Default(time.Now).
			Immutable(),
		field.Time("updated_at").
			Default(time.Now).
			UpdateDefault(time.Now),
		field.Time("started_at").
			Optional(),
		field.Time("completed_at").
			Optional(),
		field.JSON("metadata", map[string]interface{}{}).
			Optional(),
	}
}

// Edges of the Job.
func (Job) Edges() []ent.Edge {
	return []ent.Edge{
		// A job can be optionally associated with a user.
		edge.To("user", User.Type).
			Unique(),

		// A job can have logs.
		edge.To("logs", JobLog.Type),

		// A job can depend on another job (self-referencing edge).
		edge.To("depends_on", Job.Type).
			Unique().
			From("dependents"), // The inverse edge name.
		edge.To("reports", GeneratedReport.Type),
	}
}

// Indexes of the Job.
func (Job) Indexes() []ent.Index {
	return []ent.Index{
		index.Fields("type", "status"),
		index.Fields("status", "scheduled_for"),
		index.Fields("created_at"),
		index.Fields("priority", "created_at"),
		// An index for the user edge will be created automatically.
		// An index for the depends_on edge will be created automatically.
	}
}
