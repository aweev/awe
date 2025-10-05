package schema

import (
	"time"

	"entgo.io/ent"
	"entgo.io/ent/schema/field"
	"entgo.io/ent/schema/index"
)

// SystemError holds the schema definition for the SystemError entity.
type SystemError struct {
	ent.Schema
}

// Fields of the SystemError.
func (SystemError) Fields() []ent.Field {
	return []ent.Field{
		field.Time("timestamp").
			Default(time.Now),
		field.Text("message"),
		field.String("name"), // e.g., 'TypeError', 'DatabaseConnectionError'
		field.Text("stack"),
		field.JSON("metadata", map[string]interface{}{}).
			Optional(),
		field.String("user_id").
			Optional(),
		field.String("context").
			Optional(),
		field.Bool("is_resolved").
			Default(false),
		field.Time("resolved_at").
			Optional(),
		field.String("resolved_by"). // User ID of the resolver
						Optional(),
	}
}

// Edges of the SystemError.
func (SystemError) Edges() []ent.Edge {
	return []ent.Edge{
		// Similar to SystemLog, we keep this decoupled for robustness.
	}
}

// Indexes of the SystemError.
func (SystemError) Indexes() []ent.Index {
	return []ent.Index{
		index.Fields("is_resolved", "timestamp"),
		index.Fields("name"),
		index.Fields("user_id"),
	}
}
