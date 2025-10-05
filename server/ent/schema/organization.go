package schema

import (
	"time"

	"entgo.io/ent"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
)

// Organization holds the schema definition for the Organization entity.
type Organization struct {
	ent.Schema
}

// Fields of the Organization.
func (Organization) Fields() []ent.Field {
	return []ent.Field{
		field.String("name").
			Unique(),
		field.String("website").
			Optional(),
		field.String("logo_url").
			Optional(),
		field.Text("description").
			Optional(),
		field.String("industry").
			Optional(),
		field.String("size").
			Optional(),
		field.String("contact_email").
			Optional(),
		field.String("contact_phone").
			Optional(),
		field.JSON("address", map[string]string{}).
			Optional(),
		field.Time("created_at").
			Default(time.Now).
			Immutable(),
		field.Time("updated_at").
			Default(time.Now).
			UpdateDefault(time.Now),
	}
}

// Edges of the Organization.
func (Organization) Edges() []ent.Edge {
	return []ent.Edge{
		edge.To("partnerships", Partnership.Type),
		edge.To("grants", Grant.Type),
		// We'll add JobPostings later.
		// A user can be associated with an organization.
		edge.From("user", User.Type).
			Ref("organization").
			Unique(),
	}
}
