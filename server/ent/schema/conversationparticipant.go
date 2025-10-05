package schema

import (
	"entgo.io/ent"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
	"entgo.io/ent/schema/index"
)

// ConversationParticipant holds the schema definition for the ConversationParticipant entity.
type ConversationParticipant struct {
	ent.Schema
}

// Fields of the ConversationParticipant.
func (ConversationParticipant) Fields() []ent.Field {
	return []ent.Field{
		field.Time("last_read_at").
			Optional(),
	}
}

// Edges of the ConversationParticipant.
func (ConversationParticipant) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("conversation", Conversation.Type).
			Ref("participants").
			Unique().
			Required(),
		edge.From("user", User.Type).
			Ref("conversation_links").
			Unique().
			Required(),
	}
}

// Indexes of the ConversationParticipant.
func (ConversationParticipant) Indexes() []ent.Index {
	return []ent.Index{
		// Ensures a user can only be a participant in a conversation once.
		index.Edges("conversation", "user").
			Unique(),
	}
}
