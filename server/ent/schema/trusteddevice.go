package schema

import (
	"time"

	"entgo.io/ent"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
	"entgo.io/ent/schema/index"
)

type TrustedDevice struct {
	ent.Schema
}

func (TrustedDevice) Fields() []ent.Field {
	return []ent.Field{
		field.String("fingerprint"),
		field.String("user_agent").
			Optional(),
		field.String("last_ip").
			Optional(),
		field.Time("last_used_at").
			Default(time.Now).
			UpdateDefault(time.Now),
		field.Time("created_at").
			Default(time.Now).
			Immutable(),
		field.Time("verified_at").
			Optional(),
	}
}

func (TrustedDevice) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("user", User.Type).
			Ref("trusted_devices").
			Unique().
			Required(),
	}
}

func (TrustedDevice) Indexes() []ent.Index {
	return []ent.Index{
		// This creates a unique constraint on the combination of the
		// user edge (user_id) and the fingerprint field.
		// This is the direct Ent equivalent of `@@unique([userId, fingerprint])`.
		index.Edges("user").Fields("fingerprint").
			Unique(),
	}
}
