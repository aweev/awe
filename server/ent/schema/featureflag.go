package schema

import (
	"time"

	"entgo.io/ent"
	"entgo.io/ent/schema/field"
)

// FeatureFlag holds the schema definition for the FeatureFlag entity.
type FeatureFlag struct {
	ent.Schema
}

// Fields of the FeatureFlag.
func (FeatureFlag) Fields() []ent.Field {
	return []ent.Field{
		// Use the 'key' as the primary ID.
		field.String("id").
			StorageKey("key"),
		field.String("description").
			Optional(),
		field.Bool("is_active").
			Default(false),
		field.Int("rollout_percentage").
			Default(0).
			Min(0).
			Max(100),
		field.JSON("allowed_user_ids", []string{}),
		field.JSON("allowed_roles", []string{}), // Storing Role enum array
		field.Time("created_at").
			Default(time.Now).
			Immutable(),
		field.Time("updated_at").
			Default(time.Now).
			UpdateDefault(time.Now),
	}
}
