package schema

import (
	"time"

	"entgo.io/ent"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
	"entgo.io/ent/schema/index"
)

type PasswordHistory struct {
	ent.Schema
}

func (PasswordHistory) Fields() []ent.Field {
	return []ent.Field{
		field.String("hashed_password").
			Sensitive(),
		field.Time("created_at").
			Default(time.Now).
			Immutable(),
	}
}

func (PasswordHistory) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("user", User.Type).
			Ref("password_history").
			Unique().
			Required(),
	}
}

func (PasswordHistory) Indexes() []ent.Index {
	return []ent.Index{
		// Equivalent to `@@index([userId, createdAt])`
		index.Edges("user").Fields("created_at"),
	}
}
