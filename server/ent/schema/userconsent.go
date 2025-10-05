package schema

import (
	"time"

	"entgo.io/ent"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
)

type UserConsent struct {
	ent.Schema
}

func (UserConsent) Fields() []ent.Field {
	return []ent.Field{
		field.JSON("preferences", map[string]bool{}),
		field.String("ip_address").Optional(),
		field.Time("created_at").Default(time.Now).Immutable(),
		field.Time("updated_at").Default(time.Now).UpdateDefault(time.Now),
	}
}

func (UserConsent) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("user", User.Type).Ref("consents").Unique().Required(),
	}
}
