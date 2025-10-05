package schema

import (
	"time"

	"entgo.io/ent"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
	"entgo.io/ent/schema/index"
)

type UserSession struct {
	ent.Schema
}

func (UserSession) Fields() []ent.Field {
	return []ent.Field{
		field.String("session_token").
			Unique(),
		field.Time("expires_at"),
		field.String("ip_address").
			Optional(),
		field.String("user_agent").
			Optional(),
		field.Time("created_at").
			Default(time.Now).
			Immutable(),
		field.Time("last_accessed").
			Default(time.Now).
			UpdateDefault(time.Now),
		field.String("device_fingerprint").
			Optional(),
	}
}

func (UserSession) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("user", User.Type).
			Ref("sessions").
			Unique().
			Required(),
	}
}

func (UserSession) Indexes() []ent.Index {
	return []ent.Index{
		index.Fields("expires_at"),
		index.Fields("session_token"),
		index.Fields("device_fingerprint"),
	}
}
