package schema

import (
	"time"

	"entgo.io/ent"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
	"entgo.io/ent/schema/index"
)

// VolunteerApplication holds the schema definition for the VolunteerApplication entity.
type VolunteerApplication struct {
	ent.Schema
}

// Fields of the VolunteerApplication.
func (VolunteerApplication) Fields() []ent.Field {
	return []ent.Field{
		field.Enum("status").
			Values("SUBMITTED", "UNDER_REVIEW", "INTERVIEW_SCHEDULED", "BACKGROUND_CHECK", "APPROVED", "REJECTED", "WAITLISTED").
			Default("SUBMITTED"),
		field.Text("motivation"),
		field.JSON("availability", map[string]interface{}{}),
		field.Bool("background_check").
			Default(false),
		field.Time("background_check_date").
			Optional(),
		field.JSON("references", []map[string]interface{}{}).
			Optional(),
		field.JSON("emergency_contact", map[string]string{}).
			Optional(),
		field.String("reviewed_by").
			Optional(),
		field.Time("reviewed_at").
			Optional(),
		field.Text("review_notes").
			Optional(),
		field.Time("interview_date").
			Optional(),
		field.Time("created_at").
			Default(time.Now).
			Immutable(),
		field.Time("updated_at").
			Default(time.Now).
			UpdateDefault(time.Now),
	}
}

// Edges of the VolunteerApplication.
func (VolunteerApplication) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("user", User.Type).
			Ref("volunteer_applications").
			Unique().
			Required(),
		// Many-to-many relationship
		edge.From("interested_opportunities", VolunteerOpportunity.Type).
			Ref("interested_volunteers"),
	}
}

// Indexes of the VolunteerApplication.
func (VolunteerApplication) Indexes() []ent.Index {
	return []ent.Index{
		index.Edges("user"),
		index.Fields("status"),
	}
}
