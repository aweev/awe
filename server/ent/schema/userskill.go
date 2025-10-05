package schema

import (
	"entgo.io/ent"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
	"entgo.io/ent/schema/index"
)

// UserSkill holds the schema definition for the UserSkill entity.
type UserSkill struct {
	ent.Schema
}

// Fields of the UserSkill.
func (UserSkill) Fields() []ent.Field {
	return []ent.Field{
		field.Enum("level").
			Values("BEGINNER", "INTERMEDIATE", "ADVANCED", "EXPERT").
			Default("INTERMEDIATE"),
	}
}

// Edges of the UserSkill.
func (UserSkill) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("profile", UserProfile.Type).
			Ref("skills").
			Unique().
			Required(),
		edge.From("skill", Skill.Type).
			Ref("users").
			Unique().
			Required(),
	}
}

// Indexes of the UserSkill.
func (UserSkill) Indexes() []ent.Index {
	return []ent.Index{
		index.Edges("profile", "skill").
			Unique(),
		index.Edges("profile"),
		index.Edges("skill"),
		index.Fields("level"),
	}
}
