// in server/internal/repository/repository.go

package repository

import (
	"context"

	"awe/internal/domain"
)

// IUserRepository defines the contract for user data storage operations.
type IUserRepository interface {
	Create(ctx context.Context, user *domain.User, hashedPassword string) (*domain.User, error)
	GetByEmail(ctx context.Context, email string) (*domain.User, error)
}
