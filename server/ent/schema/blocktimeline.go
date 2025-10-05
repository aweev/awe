package schema

import (
	"time"

	"entgo.io/ent"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
)

// BlockTimeline holds the schema definition for the BlockTimeline entity.
type BlockTimeline struct {
	ent.Schema
}

// Fields of the BlockTimeline.
func (BlockTimeline) Fields() []ent.Field {
	return []ent.Field{
		field.String("internal_name"),
		field.JSON("badge", map[string]string{}).
			Optional(),
		field.JSON("title", map[string]string{}).
			Optional(),
		field.JSON("description", map[string]string{}).
			Optional(),
		field.String("layout").
			Default("vertical"),
		field.Time("created_at").
			Default(time.Now).
			Immutable(),
		field.Time("updated_at").
			Default(time.Now).
			UpdateDefault(time.Now),
	}
}

// Edges of the BlockTimeline.
func (BlockTimeline) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("content_block", ContentBlock.Type).
			Ref("block_timeline").
			Unique().
			Required(),
		edge.To("events", TimelineEvent.Type),
	}
}
