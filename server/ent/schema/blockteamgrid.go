package schema

import (
	"time"

	"entgo.io/ent"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
)

// BlockTeamGrid holds the schema definition for the BlockTeamGrid entity.
type BlockTeamGrid struct {
	ent.Schema
}

// Fields of the BlockTeamGrid.
func (BlockTeamGrid) Fields() []ent.Field {
	return []ent.Field{
		field.String("internal_name"),
		field.JSON("badge", map[string]string{}).
			Optional(),
		field.JSON("title", map[string]string{}).
			Optional(),
		field.JSON("description", map[string]string{}).
			Optional(),
		field.Int("items_per_row").
			Default(3),
		field.Time("created_at").
			Default(time.Now).
			Immutable(),
		field.Time("updated_at").
			Default(time.Now).
			UpdateDefault(time.Now),
	}
}

// Edges of the BlockTeamGrid.
func (BlockTeamGrid) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("content_block", ContentBlock.Type).
			Ref("block_team_grid").
			Unique().
			Required(),
		edge.To("members", TeamMemberItem.Type),
	}
}
