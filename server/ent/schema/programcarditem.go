package schema

import (
	"entgo.io/ent"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
	"entgo.io/ent/schema/index"
)

// ProgramCardItem holds the schema definition for the ProgramCardItem entity.
type ProgramCardItem struct {
	ent.Schema
}

// Fields of the ProgramCardItem.
func (ProgramCardItem) Fields() []ent.Field {
	return []ent.Field{
		field.Int("order"),
	}
}

// Edges of the ProgramCardItem.
func (ProgramCardItem) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("block", BlockProgramCards.Type).
			Ref("selected_programs").
			Unique().
			Required(),
		// We will add the edge to the 'Program' model once it's defined.
		// For now, we'll add a placeholder.
		edge.To("program", Program.Type).Unique().Required(),
	}
}

// Indexes of the ProgramCardItem.
func (ProgramCardItem) Indexes() []ent.Index {
	return []ent.Index{
		index.Edges("block").Fields("order"),
	}
}
