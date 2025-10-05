package schema

import (
	"time"

	"entgo.io/ent"
	"entgo.io/ent/schema/field"
)

// AppSetting holds the schema definition for the AppSetting entity.
type AppSetting struct {
	ent.Schema
}

// Fields of the AppSetting.
func (AppSetting) Fields() []ent.Field {
	return []ent.Field{
		// Use the 'key' as the primary ID for this model.
		field.String("id").
			StorageKey("key"), // Use "key" as the column name in the DB.
		field.JSON("value", map[string]interface{}{}),
		field.String("group").
			Default("GENERAL"),
		field.String("description").
			Optional(),
		field.Time("created_at").
			Default(time.Now).
			Immutable(),
		field.Time("updated_at").
			Default(time.Now).
			UpdateDefault(time.Now),
	}
}
