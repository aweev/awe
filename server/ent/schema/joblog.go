package schema

import (
	"time"

	"entgo.io/ent"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
	"entgo.io/ent/schema/index"
)

// JobLog holds the schema definition for the JobLog entity.
type JobLog struct {
	ent.Schema
}

// Fields of the JobLog.
func (JobLog) Fields() []ent.Field { // <--- Corrected type
	return []ent.Field{ // <--- Corrected type
		field.Enum("status").
			Values("PENDING", "WAITING", "PROCESSING", "COMPLETED", "FAILED", "CANCELLED"),
		field.String("message"),
		field.JSON("metadata", map[string]interface{}{}).
			Optional(),
		field.Time("created_at").
			Default(time.Now).
			Immutable(),
	}
}

// Edges of the JobLog.
func (JobLog) Edges() []ent.Edge { // <--- Corrected type
	return []ent.Edge{ // <--- Corrected type
		// A log entry must belong to a single job.
		edge.From("job", Job.Type).
			Ref("logs").
			Unique().
			Required(),
	}
}

// Indexes of the JobLog.
func (JobLog) Indexes() []ent.Index {
	return []ent.Index{
		index.Edges("job").Fields("created_at"),
	}
}
