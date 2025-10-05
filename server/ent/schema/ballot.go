package schema

import (
	"time"

	"entgo.io/ent"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
	"entgo.io/ent/schema/index"
)

// Ballot holds the schema definition for the Ballot entity.
type Ballot struct {
	ent.Schema
}

// Fields of the Ballot.
func (Ballot) Fields() []ent.Field {
	return []ent.Field{
		field.String("voter_id"), // Storing User ID directly
		field.String("choice"),
		field.Time("cast_at").
			Default(time.Now),
	}
}

// Edges of the Ballot.
func (Ballot) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("vote", Vote.Type).
			Ref("ballots").
			Unique().
			Required(),
	}
}

// Indexes of the Ballot.
func (Ballot) Indexes() []ent.Index {
	return []ent.Index{
		// Ensures a voter can only cast one ballot per vote.
		index.Edges("vote").Fields("voter_id").
			Unique(),
	}
}
