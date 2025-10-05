package schema

import (
	"time"

	"entgo.io/ent"
	"entgo.io/ent/dialect"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
)

// Donation holds the schema definition for the Donation entity.
type Donation struct {
	ent.Schema
}

// Fields of the Donation.
func (Donation) Fields() []ent.Field {
	return []ent.Field{
		field.Float("amount").
			SchemaType(map[string]string{dialect.Postgres: "decimal(10,2)"}),
		field.String("currency").
			Default("EUR"),
		field.Bool("is_recurring").
			Default(false),
		field.String("frequency").
			Default("ONE_TIME"),
		field.String("payment_method").
			Optional(),
		field.String("payment_id").
			Optional().
			Unique(),
		field.String("status"), // e.g., succeeded, pending, failed
		field.Time("processed_at").
			Optional(),
		field.Bool("anonymous").
			Default(false),
		field.String("payment_gateway_ref").
			Optional().
			Unique(),
		field.Text("donor_message").
			Optional(),
		field.Bool("tax_receipt_sent").
			Default(false),
		field.Time("tax_receipt_sent_at").
			Optional(),
		field.String("recurring_interval").
			Optional(),
		field.Time("next_payment_date").
			Optional(),
		field.JSON("metadata", map[string]interface{}{}).
			Optional(),
		field.Time("created_at").
			Default(time.Now).
			Immutable(),
		field.Time("updated_at").
			Default(time.Now).
			UpdateDefault(time.Now),
	}
}

// Edges of the Donation.
func (Donation) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("donor", User.Type).
			Ref("donations").
			Unique().
			Required(),
		edge.From("program", Program.Type).
			Ref("donations").
			Unique(),
		edge.From("campaign", FundraisingCampaign.Type).
			Ref("donations").
			Unique(),
	}
}
