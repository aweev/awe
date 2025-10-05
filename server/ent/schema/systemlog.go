package schema

import (
	"time"

	"entgo.io/ent"
	"entgo.io/ent/schema/field"
	"entgo.io/ent/schema/index"
)

// SystemLog holds the schema definition for the SystemLog entity.
type SystemLog struct {
	ent.Schema
}

// Fields of the SystemLog.
func (SystemLog) Fields() []ent.Field {
	return []ent.Field{
		field.Time("timestamp").
			Default(time.Now),
		field.Enum("level").
			Values("DEBUG", "INFO", "WARN", "ERROR", "FATAL"),
		field.Text("message"), // Use Text for potentially long log messages
		field.JSON("metadata", map[string]interface{}{}).
			Optional(),
		field.String("user_id"). // Storing user_id directly as it may not always link to a user
						Optional(),
		field.String("context").
			Optional(),
	}
}

// Edges of the SystemLog.
func (SystemLog) Edges() []ent.Edge {
	return []ent.Edge{
		// No direct edges needed here; we store user_id as a field for loose coupling.
		// This prevents cascades if a user is deleted and makes logging more resilient.
	}
}

// Indexes of the SystemLog.
func (SystemLog) Indexes() []ent.Index {
	return []ent.Index{
		index.Fields("level", "timestamp"),
		index.Fields("user_id"),
		index.Fields("context"),
	}
}
