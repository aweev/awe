// in server/internal/service/auth.go
package service

import (
	"awe/internal/domain"
	"awe/internal/repository"
	"context"
	"errors"
)

type authService struct {
	userRepo    repository.IUserRepository
	passwordSvc IPasswordService
}

func NewAuthService(userRepo repository.IUserRepository, passwordSvc IPasswordService) IAuthService {
	return &authService{userRepo: userRepo, passwordSvc: passwordSvc}
}

func (s *authService) Register(ctx context.Context, input domain.RegisterInput) (*domain.User, error) {
	// 1. Check if user already exists (Business Rule)
	existingUser, err := s.userRepo.GetByEmail(ctx, input.Email)
	if err != nil && !ent.IsNotFound(err) {
		return nil, err // A real database error occurred
	}
	if existingUser != nil {
		return nil, errors.New("user with this email already exists")
	}

	// 2. Hash the password
	hashedPassword, err := s.passwordSvc.HashPassword(input.Password)
	if err != nil {
		return nil, err
	}

	// 3. Create the user domain object
	userToCreate := &domain.User{
		Email:    input.Email,
		Username: input.Username,
		Roles:    []string{"ACTIVE_VOLUNTEER"}, // Default role
	}

	// 4. Pass to repository to save
	createdUser, err := s.userRepo.Create(ctx, userToCreate, hashedPassword)
	if err != nil {
		return nil, err
	}

	// 5. TODO: Enqueue a job to send a welcome email (JobService would be a dependency here)

	return createdUser, nil
}
