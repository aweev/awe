package schema

import (
	"time"

	"entgo.io/ent"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
)

type UserProfile struct {
	ent.Schema
}

func (UserProfile) Fields() []ent.Field {
	return []ent.Field{
		field.String("first_name").
			Optional(),
		field.String("last_name").
			Optional(),
		field.String("avatar_url").
			Optional(),
		field.String("bio").
			MaxLen(500).
			Optional(),
		field.String("phone").
			Optional(),
		field.String("job_title").
			Optional(),
		field.String("company").
			Optional(),
		field.String("linkedin").
			Optional(),
		field.String("twitter").
			Optional(),
		field.JSON("interests", []string{}),
		field.Int("completed_pct").
			Default(0),
		field.Time("created_at").
			Default(time.Now).
			Immutable(),
		field.Time("updated_at").
			Default(time.Now).
			UpdateDefault(time.Now),
	}
}

func (UserProfile) Edges() []ent.Edge {
	return []ent.Edge{
		// One-to-one inverse relation back to User
		edge.From("user", User.Type).
			Ref("profile").
			Unique().
			Required(), // A profile must have a user.
		edge.To("assignments", VolunteerAssignment.Type),
		edge.To("skills", UserSkill.Type),
		edge.To("address", Address.Type).Unique().Required(),
	}
}
