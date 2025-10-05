package schema

import (
	"entgo.io/ent"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
	"entgo.io/ent/schema/index"
)

// TeamMemberItem holds the schema definition for the TeamMemberItem entity.
type TeamMemberItem struct {
	ent.Schema
}

// Fields of the TeamMemberItem.
func (TeamMemberItem) Fields() []ent.Field {
	return []ent.Field{
		field.Int("order"),
		field.String("name"),
		field.JSON("role", map[string]string{}),
		field.JSON("bio", map[string]string{}).
			Optional(),
		field.String("image_url").
			Optional(),
		field.String("linkedin_url").
			Optional(),
		field.String("twitter_url").
			Optional(),
		field.String("email_url"). // Renamed from emailUrl to follow Go conventions
						Optional(),
	}
}

// Edges of the TeamMemberItem.
func (TeamMemberItem) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("block", BlockTeamGrid.Type).
			Ref("members").
			Unique().
			Required(),
	}
}

// Indexes of the TeamMemberItem.
func (TeamMemberItem) Indexes() []ent.Index {
	return []ent.Index{
		index.Edges("block").Fields("order"),
	}
}
