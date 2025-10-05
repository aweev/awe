package schema

import (
	"entgo.io/ent"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
)

// Vote holds the schema definition for the Vote entity.
type Vote struct {
	ent.Schema
}

// Fields of the Vote.
func (Vote) Fields() []ent.Field {
	return []ent.Field{
		field.String("question"),
		field.JSON("options", []string{}), // ["For", "Against", "Abstain"]
		field.String("status").
			Default("open"), // open, closed
		field.String("result").
			Optional(),
	}
}

// Edges of the Vote.
func (Vote) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("agenda_item", AgendaItem.Type).
			Ref("vote").
			Unique().
			Required(),
		edge.To("ballots", Ballot.Type),
	}
}
