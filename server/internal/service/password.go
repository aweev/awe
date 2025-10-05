// in server/internal/service/password.go
package service

import "golang.org/x/crypto/bcrypt"

type passwordService struct{}

func NewPasswordService() IPasswordService {
	return &passwordService{}
}

func (s *passwordService) HashPassword(password string) (string, error) {
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	return string(bytes), err
}

func (s *passwordService) ComparePassword(hashedPassword, password string) error {
	return bcrypt.CompareHashAndPassword([]byte(hashedPassword), []byte(password))
}
