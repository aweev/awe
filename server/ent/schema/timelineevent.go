package schema

import (
	"entgo.io/ent"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
	"entgo.io/ent/schema/index"
)

// TimelineEvent holds the schema definition for the TimelineEvent entity.
type TimelineEvent struct {
	ent.Schema
}

// Fields of the TimelineEvent.
func (TimelineEvent) Fields() []ent.Field {
	return []ent.Field{
		field.Int("order"),
		field.String("date"), // Using string for flexibility (e.g., "Q1 2024", "March 5th")
		field.JSON("title", map[string]string{}),
		field.JSON("description", map[string]string{}).
			Optional(),
		field.String("image_url").
			Optional(),
	}
}

// Edges of the TimelineEvent.
func (TimelineEvent) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("block", BlockTimeline.Type).
			Ref("events").
			Unique().
			Required(),
	}
}

// Indexes of the TimelineEvent.
func (TimelineEvent) Indexes() []ent.Index {
	return []ent.Index{
		index.Edges("block").Fields("order"),
	}
}
