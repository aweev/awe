package schema

import (
	"time"

	"entgo.io/ent"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
)

// BlockProgramCards holds the schema definition for the BlockProgramCards entity.
type BlockProgramCards struct {
	ent.Schema
}

// Fields of the BlockProgramCards.
func (BlockProgramCards) Fields() []ent.Field {
	return []ent.Field{
		field.String("internal_name"),
		field.JSON("badge", map[string]string{}).
			Optional(),
		field.JSON("title", map[string]string{}).
			Optional(),
		field.JSON("description", map[string]string{}).
			Optional(),
		field.String("layout").
			Default("grid"),
		field.Int("items_per_row").
			Default(3),
		field.Bool("show_all_programs").
			Default(true),
		field.Time("created_at").
			Default(time.Now).
			Immutable(),
		field.Time("updated_at").
			Default(time.Now).
			UpdateDefault(time.Now),
	}
}

// Edges of the BlockProgramCards.
func (BlockProgramCards) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("content_block", ContentBlock.Type).
			Ref("block_program_cards").
			Unique().
			Required(),
		// If `show_all_programs` is false, this edge holds the manually selected programs.
		edge.To("selected_programs", ProgramCardItem.Type),
	}
}
