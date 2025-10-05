package schema

import (
	"time"

	"entgo.io/ent"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
	"entgo.io/ent/schema/index"
)

type Token struct {
	ent.Schema
}

func (Token) Fields() []ent.Field {
	return []ent.Field{
		field.Enum("type").
			Values(
				"RESET_PASSWORD",
				"VERIFY_EMAIL",
				"IMPERSONATE",
				"TWO_FACTOR_AUTH",
				"ACCESS_TOKEN",
				"REFRESH_TOKEN",
				"MFA_TOKEN",
			),
		field.String("token_hash").
			Unique(),
		field.String("jti").
			Optional().
			Unique(),
		field.Time("expires_at"),
		field.Bool("used").
			Default(false),
		field.Bool("mfa_verified").
			Default(false),
		field.String("mfa_method").
			Optional(),
		field.Time("created_at").
			Default(time.Now).
			Immutable(),
	}
}

func (Token) Edges() []ent.Edge {
	return []ent.Edge{
		// A Token must belong to a single User.
		// This creates the `user_id` foreign key column.
		edge.From("user", User.Type).
			Ref("tokens"). // This links it back to the 'tokens' edge on the User schema.
			Unique().
			Required(),
	}
}

func (Token) Indexes() []ent.Index {
	return []ent.Index{
		index.Fields("type"),
		index.Fields("expires_at"),
		index.Fields("used"),
		index.Fields("jti"),
	}
}
