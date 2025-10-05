// in server/internal/domain/user.go

package domain

import "time"

// User represents a user in the business domain. It's clean and decoupled from the database.
type User struct {
	ID        int
	Email     string
	Username  string
	IsActive  bool
	Roles     []string
	CreatedAt time.Time
	UpdatedAt time.Time
}

// RegisterInput defines the data needed for the registration service.
type RegisterInput struct {
	Email    string `json:"email" validate:"required,email"`
	Password string `json:"password" validate:"required,min=8"`
	Username string `json:"username" validate:"required,min=3"`
}
