package schema

import (
	"entgo.io/ent"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
)

type SiteVisit struct {
	ent.Schema
}

func (SiteVisit) Fields() []ent.Field {
	return []ent.Field{
		field.Time("requested_date"),
		field.Time("scheduled_date").Optional(),
		field.String("status").Default("requested"), // requested, scheduled, completed, cancelled
		field.Text("notes").Optional(),
	}
}

func (SiteVisit) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("donor", User.Type).Ref("site_visits").Unique().Required(),
		edge.From("program", Program.Type).Ref("site_visits").Unique().Required(),
	}
}
