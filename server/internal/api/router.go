// in server/internal/api/router.go
package api

import (
	"awe/internal/api/handler"
	"net/http"

	"github.com/go-chi/chi"
	"github.com/go-chi/chi/middleware"
)

func NewRouter(userHandler *handler.UserHandler) http.Handler {
	r := chi.NewRouter()

	// Basic middleware
	r.Use(middleware.Logger)
	r.Use(middleware.Recoverer)
	r.Use(middleware.RequestID)

	// API routes
	r.Route("/api/v1", func(r chi.Router) {
		r.Post("/auth/register", userHandler.Register)
		// ... we would add /auth/login here later
	})

	return r
}
