// in server/internal/repository/user.go

package repository

import (
	"context"

	"awe/ent"
	"awe/ent/ent/user"
	"awe/internal/domain"
)

// userRepository is the Ent implementation of IUserRepository.
type userRepository struct {
	client *ent.Client
}

// NewUserRepository creates a new user repository.
func NewUserRepository(client *ent.Client) IUserRepository {
	return &userRepository{client: client}
}

// toDomainUser is a private helper to map from ent.User to domain.User
func toDomainUser(entUser *ent.User) *domain.User {
	return &domain.User{
		ID:        entUser.ID,
		Email:     entUser.Email,
		Username:  entUser.Username,
		IsActive:  entUser.IsActive,
		Roles:     entUser.Roles,
		CreatedAt: entUser.CreatedAt,
		UpdatedAt: entUser.UpdatedAt,
	}
}

func (r *userRepository) Create(ctx context.Context, u *domain.User, hashedPassword string) (*domain.User, error) {
	// Use the Ent client to create a new user in the database.
	entUser, err := r.client.User.
		Create().
		SetEmail(u.Email).
		SetUsername(u.Username).
		SetHashedPassword(hashedPassword).
		SetRoles(u.Roles). // We can set default roles here
		Save(ctx)
	if err != nil {
		return nil, err
	}

	// Map the newly created ent.User back to our clean domain.User and return it.
	return toDomainUser(entUser), nil
}

func (r *userRepository) GetByEmail(ctx context.Context, email string) (*domain.User, error) {
	entUser, err := r.client.User.
		Query().
		Where(user.EmailEQ(email)).
		Only(ctx) // Only expects exactly one result, fails otherwise.

	if err != nil {
		return nil, err
	}
	return toDomainUser(entUser), nil
}
