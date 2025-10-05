package schema

import (
	"time"

	"entgo.io/ent"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
	"entgo.io/ent/schema/index"
)

type User struct {
	ent.Schema
}

func (User) Fields() []ent.Field {
	return []ent.Field{
		// Prisma: id String @id @default(cuid()) -> Ent handles ID automatically.
		// We'll use the default integer ID for better DB performance. CUIDs can be added if needed.
		field.String("email").
			Unique(),
		field.String("username").
			Unique().
			Optional(),

		field.String("hashed_password").
			Optional().
			Sensitive(), // Prevents it from being exposed in logs or JSON responses.
		field.Bool("is_verified").
			Default(false),
		field.Time("email_verified").
			Optional(),
		field.Time("last_login_at").
			Optional(),
		field.Bool("is_active").
			Default(true),
		field.Time("deactivated_at").
			Optional(),
		field.Time("locked_until").
			Optional(),
		field.Time("created_at").
			Default(time.Now).
			Immutable(),
		field.Time("updated_at").
			Default(time.Now).
			UpdateDefault(time.Now),

		// New fields from your schema
		field.String("impersonating_user_id").
			Optional(),
		field.Time("security_timestamp").
			Default(time.Now),
		field.Bool("password_reset_required").
			Default(false),
		field.JSON("roles", []string{}), // Storing enum array as a JSON array of strings
		field.String("mfa_secret").
			Optional().
			Sensitive(),
		field.Bool("mfa_enabled").
			Default(false),
		field.Time("onboarding_started_at").
			Optional(),
		field.Time("onboarding_completed_at").
			Optional(),
		field.Bool("onboarding_skipped").
			Default(false),
		field.String("onboarding_version").
			Optional(),
		field.Bool("onboarding_completed").
			Default(false),
		field.String("position").
			Optional(),
		// For storing custom analytics properties
		field.JSON("analytics_properties", map[string]interface{}{}).
			Optional(),
	}
}

func (User) Edges() []ent.Edge {
	return []ent.Edge{
		// SECTION 1: CORE PLATFORM, AUTH & SECURITY
		edge.To("profile", UserProfile.Type).Unique(),
		edge.To("sessions", UserSession.Type),
		edge.To("tokens", Token.Type),
		edge.To("trusted_devices", TrustedDevice.Type),
		edge.To("password_history", PasswordHistory.Type),
		edge.To("team_member", TeamMember.Type).Unique(), // CORRECTED: This was missing in your last batch
		edge.To("audit_logs", AuditLog.Type),

		// SECTION 2: JOB QUEUE
		edge.To("jobs", Job.Type),

		// SECTION 3: ANALYTICS & REPORTING
		edge.To("dashboards", AnalyticsDashboard.Type),
		edge.To("analytics_events", AnalyticsEvent.Type),
		edge.To("created_reports", ReportDefinition.Type),
		edge.To("generated_reports", GeneratedReport.Type), // CORRECTED: This was missing
		edge.To("report_permissions", ReportPermission.Type),
		edge.To("scheduled_reports", ScheduledReport.Type), // CORRECTED: This was missing

		// SECTION 6: PROGRAM MANAGEMENT
		edge.To("created_programs", Program.Type),
		edge.To("updated_programs", Program.Type),
		edge.To("program_enrolments", ProgramEnrolment.Type),
		edge.To("participant_in", ProgramParticipant.Type),

		// SECTION 7: COMMUNITY & ENGAGEMENT
		edge.To("success_stories", SuccessStory.Type),
		edge.To("news_articles", NewsArticle.Type),
		edge.To("created_events", Event.Type),
		edge.To("event_registrations", EventRegistration.Type),

		// SECTION 8: INTERNAL MESSAGING
		edge.To("messages_sent", Message.Type),
		edge.To("conversation_links", ConversationParticipant.Type),

		// SECTION 9: VOLUNTEER & MENTORSHIP
		edge.To("volunteer_applications", VolunteerApplication.Type),
		edge.To("mentorship_requests", MentorshipRequest.Type),
		edge.To("mentorships_mentoring", MentorshipRequest.Type),
		edge.To("achievements", UserAchievement.Type),
		// edge.To("certifications_earned", Certification.Type),

		// SECTION 10: FINANCIALS, DONATIONS & PARTNERSHIPS
		edge.To("donations", Donation.Type),
		edge.To("organization", Organization.Type),
		edge.To("managed_partnerships", Partnership.Type),
		edge.To("partnership_contacts", Partnership.Type),

		// SECTION 11 (Other)
		edge.To("site_visits", SiteVisit.Type),
		edge.To("document_uploads", Document.Type),
		edge.To("activity_logs", ActivityLog.Type),
		edge.To("consents", UserConsent.Type).Unique(),
		edge.To("onboarding", UserOnboarding.Type).Unique(),

		// Will be added in the next batch
		// edge.To("activity_logs", ActivityLog.Type),
		// edge.To("notification_preferences", NotificationPreference.Type).Unique(),
		// edge.To("push_subscriptions", PushSubscription.Type),
		// edge.To("invitations_sent", UserInvitation.Type),
	}
}

func (User) Indexes() []ent.Index {
	return []ent.Index{
		// Mimics @@index([email])
		index.Fields("email"),
		index.Fields("is_active"),
		index.Fields("locked_until"),
	}
}
