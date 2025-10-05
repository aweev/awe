package schema

import (
	"time"

	"entgo.io/ent"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
)

type ActivityLog struct {
	ent.Schema
}

func (ActivityLog) Fields() []ent.Field {
	return []ent.Field{
		field.Enum("type").Values("USER_REGISTERED", "DONATION_RECEIVED", "PROGRAM_COMPLETED", "PARTNERSHIP_STARTED", "STORY_SUBMITTED", "VOLUNTEER_APPLIED", "VOTE_CAST", "ACTION_ITEM_CREATED"),
		field.String("title"),
		field.String("description").Optional(),
		field.String("link_href").Optional(),
		field.String("entity_type").Optional(),
		field.String("entity_id").Optional(),
		field.JSON("metadata", map[string]interface{}{}).Optional(),
		field.String("ip_address").Optional(),
		field.String("user_agent").Optional(),
		field.Time("created_at").Default(time.Now),
	}
}

func (ActivityLog) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("actor", User.Type).Ref("activity_logs").Unique(),
	}
}
