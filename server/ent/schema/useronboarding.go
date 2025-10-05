package schema

import (
	"time"
	"entgo.io/ent"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
)

type UserOnboarding struct {
	ent.Schema
}

func (UserOnboarding) Fields() []ent.Field {
	return []ent.Field{
		field.Bool("is_completed").Default(false),
		field.Time("completed_at").Optional(),
		field.JSON("steps", map[string]interface{}{}),
		field.Time("created_at").Default(time.Now).Immutable(),
		field.Time("updated_at").Default(time.Now).UpdateDefault(time.Now),
	}
}

func (UserOnboarding) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("user", User.Type).Ref("onboarding").Unique().Required(),
	}
}