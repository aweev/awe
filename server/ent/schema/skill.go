package schema

import (
	"entgo.io/ent"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
)

// Skill holds the schema definition for the Skill entity.
type Skill struct {
	ent.Schema
}

// Fields of the Skill.
func (Skill) Fields() []ent.Field {
	return []ent.Field{
		field.String("key").
			Unique(),
		field.JSON("name", map[string]string{}),
		field.Enum("category").
			Values("TECHNICAL", "SOFT_SKILLS", "LANGUAGES", "CREATIVE", "MANAGEMENT"),
	}
}

// Edges of the Skill.
func (Skill) Edges() []ent.Edge {
	return []ent.Edge{
		edge.To("users", UserSkill.Type),
	}
}
