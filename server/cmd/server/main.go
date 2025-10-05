// in server/cmd/server/main.go
package main

import (
	"awe/ent"
	"awe/internal/api"
	"awe/internal/api/handler"
	"awe/internal/repository"
	"awe/internal/service"
	"context"
	"log"
	"net/http"
	"os"

	_ "github.com/lib/pq"
)

func main() {
	// =========================================================================
	// Configuration (we would use Viper here in a real app)
	// =========================================================================
	dbURL := os.Getenv("POSTGRES_URL")
	if dbURL == "" {
		log.Fatal("POSTGRES_URL environment variable is not set")
	}

	// =========================================================================
	// Database (Ent Client)
	// =========================================================================
	client, err := ent.Open("postgres", dbURL)
	if err != nil {
		log.Fatalf("failed opening connection to postgres: %v", err)
	}
	defer client.Close()

	// Run the auto migration tool to create all schema resources.
	if err := client.Schema.Create(context.Background()); err != nil {
		log.Fatalf("failed creating schema resources: %v", err)
	}
	log.Println("Database schema created/updated successfully.")

	// =========================================================================
	// Dependency Injection (Wiring the application together)
	// =========================================================================

	// --- Repositories ---
	userRepo := repository.NewUserRepository(client)

	// --- Services ---
	passwordSvc := service.NewPasswordService()
	authSvc := service.NewAuthService(userRepo, passwordSvc)

	// --- API Handlers ---
	userHandler := handler.NewUserHandler(authSvc)

	// --- Router ---
	router := api.NewRouter(userHandler)

	// =========================================================================
	// Start Server
	// =========================================================================
	serverPort := ":8080"
	log.Printf("Starting AWE server on %s", serverPort)
	if err := http.ListenAndServe(serverPort, router); err != nil {
		log.Fatal(err)
	}
}
