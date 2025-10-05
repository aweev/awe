package schema

import (
	"time"

	"entgo.io/ent"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
	"entgo.io/ent/schema/index"
)

type PartnershipInteraction struct {
	ent.Schema
}

func (PartnershipInteraction) Fields() []ent.Field {
	return []ent.Field{
		field.String("interaction_type"),
		field.String("subject"),
		field.Text("summary").Optional(),
		field.Time("interacted_at").Default(time.Now),
		field.JSON("attendees", []string{}),
		field.Bool("follow_up_required").Default(false),
		field.Time("follow_up_date").Optional(),
		field.Time("created_at").Default(time.Now).Immutable(),
		field.Time("updated_at").Default(time.Now).UpdateDefault(time.Now),
	}
}
func (PartnershipInteraction) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("partnership", Partnership.Type).Ref("interactions").Unique().Required(),
	}
}
func (PartnershipInteraction) Indexes() []ent.Index {
	return []ent.Index{
		index.Edges("partnership"),
		index.Fields("follow_up_required", "follow_up_date"),
	}
}
