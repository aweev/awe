package schema

import (
	"entgo.io/ent"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
)

// Badge holds the schema definition for the Badge entity.
type Badge struct {
	ent.Schema
}

// Fields of the Badge.
func (Badge) Fields() []ent.Field {
	return []ent.Field{
		field.JSON("name", map[string]string{}),
		field.JSON("description", map[string]string{}),
		field.String("image_url"),
		field.String("criteria"),
	}
}

// Edges of the Badge.
func (Badge) Edges() []ent.Edge {
	return []ent.Edge{
		edge.To("user_achievements", UserAchievement.Type),
	}
}
