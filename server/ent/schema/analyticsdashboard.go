package schema

import (
	"time"

	"entgo.io/ent"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
	"entgo.io/ent/schema/index"
)

// AnalyticsDashboard holds the schema definition for the AnalyticsDashboard entity.
type AnalyticsDashboard struct {
	ent.Schema
}

// Fields of the AnalyticsDashboard.
func (AnalyticsDashboard) Fields() []ent.Field {
	return []ent.Field{
		field.JSON("name", map[string]string{}), // Multi-language
		field.JSON("description", map[string]string{}).
			Optional(),
		field.String("slug").
			Unique(),
		field.JSON("layout", map[string]interface{}{}), // Dashboard layout and widget configuration
		field.Bool("is_default").
			Default(false),
		field.Bool("is_public").
			Default(false),
		field.JSON("shared_with", []string{}).
			Optional(),
		field.JSON("allowed_roles", []string{}),
		field.Time("created_at").
			Default(time.Now).
			Immutable(),
		field.Time("updated_at").
			Default(time.Now).
			UpdateDefault(time.Now),
	}
}

// Edges of the AnalyticsDashboard.
func (AnalyticsDashboard) Edges() []ent.Edge {
	return []ent.Edge{
		// A dashboard has an owner.
		edge.From("owner", User.Type).
			Ref("dashboards").
			Unique().
			Required(),
		// A dashboard has many widgets.
		edge.To("widgets", DashboardWidget.Type),
	}
}

// Indexes of the AnalyticsDashboard.
func (AnalyticsDashboard) Indexes() []ent.Index {
	return []ent.Index{
		index.Fields("is_default", "is_public"),
		index.Fields("slug"),
	}
}
