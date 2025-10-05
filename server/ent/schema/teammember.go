package schema

import (
	"time"

	"entgo.io/ent"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
	"entgo.io/ent/schema/index"
)

// TeamMember holds the schema definition for the TeamMember entity.
type TeamMember struct {
	ent.Schema
}

// Fields of the TeamMember.
func (TeamMember) Fields() []ent.Field {
	return []ent.Field{
		field.String("name"),
		field.JSON("title", map[string]string{}), // For multi-language job titles
		field.JSON("bio", map[string]string{}).
			Optional(),
		field.String("image_url").
			Optional(),
		field.String("linkedin_url").
			Optional(),
		field.String("twitter_url").
			Optional(),
		field.String("email").
			Optional(),
		field.Enum("type").
			Values("LEADERSHIP", "BOARD_MEMBER", "KEY_STAFF", "ADVISOR"),
		field.Int("display_order").
			Default(0),
		field.Bool("is_active").
			Default(true),
		field.Time("created_at").
			Default(time.Now).
			Immutable(),
		field.Time("updated_at").
			Default(time.Now).
			UpdateDefault(time.Now),
	}
}

// Edges of the TeamMember.
func (TeamMember) Edges() []ent.Edge {
	return []ent.Edge{
		// Optional one-to-one link to a User.
		// A TeamMember might not be a system user.
		edge.To("user", User.Type).
			Unique(),
	}
}

// Indexes of the TeamMember.
func (TeamMember) Indexes() []ent.Index {
	return []ent.Index{
		index.Fields("type", "is_active", "display_order"),
	}
}

