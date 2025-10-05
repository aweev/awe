package schema

import (
	"entgo.io/ent"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
)

type Address struct {
	ent.Schema
}

func (Address) Fields() []ent.Field {
	return []ent.Field{
		field.String("street1"),
		field.String("street2").Optional(),
		field.String("city"),
		field.String("state"),
		field.String("postal_code"),
		field.String("country"),
	}
}

func (Address) Edges() []ent.Edge {
	return []ent.Edge{
		edge.To("user_profiles", UserProfile.Type),
		edge.To("events", Event.Type),
		// We'll add JobPostings later.
	}
}
