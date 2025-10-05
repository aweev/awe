package schema

import (
	"time"

	"entgo.io/ent"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
	"entgo.io/ent/schema/index"
)

// AnalyticsEvent holds the schema definition for the AnalyticsEvent entity.
type AnalyticsEvent struct {
	ent.Schema
}

// Fields of the AnalyticsEvent.
func (AnalyticsEvent) Fields() []ent.Field {
	return []ent.Field{
		field.String("event_name"), // e.g., 'DonationCompleted', 'PageViewed'
		field.JSON("properties", map[string]interface{}{}),
		field.Time("created_at").
			Default(time.Now).
			Immutable(),
	}
}

// Edges of the AnalyticsEvent.
func (AnalyticsEvent) Edges() []ent.Edge {
	return []ent.Edge{
		// An event can be optionally associated with a user.
		edge.From("user", User.Type).
			Ref("analytics_events").
			Unique(),
	}
}

// Indexes of the AnalyticsEvent.
func (AnalyticsEvent) Indexes() []ent.Index {
	return []ent.Index{
		index.Edges("user").Fields("event_name"),
		index.Fields("event_name", "created_at"),
		index.Fields("created_at"),
	}
}
