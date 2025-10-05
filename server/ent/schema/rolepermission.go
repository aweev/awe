package schema

import (
	"entgo.io/ent"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
	"entgo.io/ent/schema/index"
)

// RolePermission holds the schema definition for the RolePermission entity.
type RolePermission struct {
	ent.Schema
}

// Fields of the RolePermission.
func (RolePermission) Fields() []ent.Field {
	return []ent.Field{
		// Here we use the Ent Enum field to ensure that only valid roles
		// from your Prisma schema can be used.
		field.Enum("role").
			Values(
				"SUPER_ADMIN",
				"EXECUTIVE_DIRECTOR",
				"PROGRAM_MANAGER",
				"CONTENT_MANAGER",
				"FINANCE_MANAGER",
				"VOLUNTEER_COORDINATOR",
				"DATA_ANALYST",
				"BOARD_MEMBER",
				"ACTIVE_VOLUNTEER",
				"PROGRAM_ALUMNI",
				"CORPORATE_PARTNER",
				"INDIVIDUAL_MAJOR_DONOR",
				"INSTITUTIONAL_PARTNER",
				"PROGRAM_MENTOR",
			),
	}
}

// Edges of the RolePermission.
func (RolePermission) Edges() []ent.Edge {
	return []ent.Edge{
		// This defines the many-to-one relationship to the Permission model.
		edge.From("permission", Permission.Type).
			Ref("roles").
			Unique().
			Required(),
	}
}

// Indexes of the RolePermission.
func (RolePermission) Indexes() []ent.Index {
	return []ent.Index{
		// This enforces that a role can only be assigned a specific permission once.
		// It is the direct equivalent of `@@unique([role, permissionId])`.
		index.Fields("role").Edges("permission").
			Unique(),
	}
}
