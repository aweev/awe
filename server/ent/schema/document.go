package schema

import (
	"time"

	"entgo.io/ent"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
)

type Document struct {
	ent.Schema
}

func (Document) Fields() []ent.Field {
	return []ent.Field{
		field.JSON("title", map[string]string{}),
		field.Enum("type").Values("FINANCIAL_REPORT", "ANNUAL_REPORT", "BOARD_MINUTES", "POLICY_DOCUMENT", "GRANT_PROPOSAL", "IMPACT_ASSESSMENT", "TRAINING_MATERIAL", "MARKETING_ASSET", "LEGAL_DOCUMENT"),
		field.String("file_url"),
		field.String("file_name"),
		field.String("mime_type").Optional(),
		field.Int("size").Optional(),
		field.JSON("description", map[string]string{}).Optional(),
		field.JSON("tags", []string{}),
		field.String("version").Default("1.0"),
		field.String("language").Default("en"),
		field.Bool("is_public").Default(false),
		field.JSON("allowed_roles", []string{}),
		field.String("access_password").Optional().Sensitive(),
		field.Bool("requires_approval").Default(false),
		field.Bool("is_approved").Default(true),
		field.String("approved_by").Optional(),
		field.Time("approved_at").Optional(),
		field.Int("download_count").Default(0),
		field.Time("last_accessed").Optional(),
		field.Time("created_at").Default(time.Now).Immutable(),
		field.Time("updated_at").Default(time.Now).UpdateDefault(time.Now),
	}
}

func (Document) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("uploader", User.Type).Ref("document_uploads").Unique().Required(),
		edge.From("category", DocumentCategory.Type).Ref("documents").Unique(),
	}
}
