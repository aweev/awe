package schema

import (
	"time"

	"entgo.io/ent"
	"entgo.io/ent/schema/field"
)

// BrandConfig holds the schema definition for the BrandConfig entity.
type BrandConfig struct {
	ent.Schema
}

// Fields of the BrandConfig.
func (BrandConfig) Fields() []ent.Field {
	return []ent.Field{
		field.String("singleton").
			Unique().
			Immutable(), // This value should never change.
		field.String("name").
			Default("AWE e.V."),
		field.String("logo_url").
			Optional(),
		field.JSON("colors", map[string]string{}),
		field.JSON("contact", map[string]string{}),
		field.JSON("social", map[string]string{}),
		field.Time("updated_at").
			Default(time.Now).
			UpdateDefault(time.Now),
	}
}
