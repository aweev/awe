package schema

import (
	"time"

	"entgo.io/ent"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
	"entgo.io/ent/schema/index"
)

// UserAchievement holds the schema definition for the UserAchievement entity.
type UserAchievement struct {
	ent.Schema
}

// Fields of the UserAchievement.
func (UserAchievement) Fields() []ent.Field {
	return []ent.Field{
		field.Time("awarded_at").
			Default(time.Now),
		field.String("notes").
			Optional(),
	}
}

// Edges of the UserAchievement.
func (UserAchievement) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("user", User.Type).
			Ref("achievements").
			Unique().
			Required(),
		edge.From("badge", Badge.Type).
			Ref("user_achievements").
			Unique().
			Required(),
	}
}

// Indexes of the UserAchievement.
func (UserAchievement) Indexes() []ent.Index {
	return []ent.Index{
		index.Edges("user", "badge").
			Unique(),
	}
}
