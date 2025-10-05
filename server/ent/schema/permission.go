package schema

import (
	"entgo.io/ent"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
	"entgo.io/ent/schema/index"
)

// Permission holds the schema definition for the Permission entity.
type Permission struct {
	ent.Schema
}

// Fields of the Permission.
func (Permission) Fields() []ent.Field {
	return []ent.Field{
		// Prisma: resource String
		field.String("resource"),
		// Prisma: action String
		field.String("action"),
	}
}

// Edges of the Permission.
func (Permission) Edges() []ent.Edge {
	return []ent.Edge{
		// This defines the "many-to-many" relationship to roles
		// through the RolePermission join table.
		edge.To("roles", RolePermission.Type),
	}
}

// Indexes of the Permission.
func (Permission) Indexes() []ent.Index {
	return []ent.Index{
		// This enforces that the combination of 'resource' and 'action' must be unique.
		// It is the direct equivalent of `@@unique([resource, action])`.
		index.Fields("resource", "action").
			Unique(),
	}
}
