package schema

import (
	"time"

	"entgo.io/ent"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
)

// Message holds the schema definition for the Message entity.
type Message struct {
	ent.Schema
}

// Fields of the Message.
func (Message) Fields() []ent.Field {
	return []ent.Field{
		field.Text("content"),
		field.Time("created_at").
			Default(time.Now).
			Immutable(),
	}
}

// Edges of the Message.
func (Message) Edges() []ent.Edge {
	return []ent.Edge{
		// A message belongs to a single conversation.
		edge.From("conversation", Conversation.Type).
			Ref("messages").
			Unique().
			Required(),
		// A message is sent by a single user.
		edge.From("sender", User.Type).
			Ref("messages_sent").
			Unique().
			Required(),
	}
}
