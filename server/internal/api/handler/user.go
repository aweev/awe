// in server/internal/api/handler/user.go
package handler

import (
	"awe/internal/domain"
	"awe/internal/service"
	"encoding/json"
	"net/http"

	"github.com/go-playground/validator/v10"
)

type UserHandler struct {
	authService service.IAuthService
	validate    *validator.Validate
}

func NewUserHandler(authService service.IAuthService) *UserHandler {
	return &UserHandler{
		authService: authService,
		validate:    validator.New(),
	}
}

func (h *UserHandler) Register(w http.ResponseWriter, r *http.Request) {
	var input domain.RegisterInput
	// Decode the incoming JSON body
	if err := json.NewDecoder(r.Body).Decode(&input); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	// Validate the input using the tags in our domain struct
	if err := h.validate.Struct(input); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	// Call the service layer with the validated data
	user, err := h.authService.Register(r.Context(), input)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Respond with the created user
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(user)
}
