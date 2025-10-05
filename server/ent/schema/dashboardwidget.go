package schema

import (
	"time"

	"entgo.io/ent"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
	"entgo.io/ent/schema/index"
)

// DashboardWidget holds the schema definition for the DashboardWidget entity.
type DashboardWidget struct {
	ent.Schema
}

// Fields of the DashboardWidget.
func (DashboardWidget) Fields() []ent.Field {
	return []ent.Field{
		field.JSON("title", map[string]string{}), // Multi-language
		field.String("type"),                     // chart, metric, table, map, etc.
		field.JSON("config", map[string]interface{}{}),
		field.String("data_source"),
		field.JSON("query", map[string]interface{}{}).
			Optional(),
		field.Int("order").
			Default(0),
		field.JSON("position", map[string]int{}), // { x: 0, y: 0, width: 4, height: 2 }
		field.Bool("is_visible").
			Default(true),
		field.Int("refresh_rate").
			Optional(),
		field.Time("created_at").
			Default(time.Now).
			Immutable(),
		field.Time("updated_at").
			Default(time.Now).
			UpdateDefault(time.Now),
	}
}

// Edges of the DashboardWidget.
func (DashboardWidget) Edges() []ent.Edge {
	return []ent.Edge{
		// A widget must belong to a single dashboard.
		edge.From("dashboard", AnalyticsDashboard.Type).
			Ref("widgets").
			Unique().
			Required(),
	}
}

// Indexes of the DashboardWidget.
func (DashboardWidget) Indexes() []ent.Index {
	return []ent.Index{
		index.Edges("dashboard").Fields("order"),
	}
}
