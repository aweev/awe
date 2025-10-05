# ====================================================================================
# HELP
# ====================================================================================

help:
	@echo "Makefile for the AWE Project"
	@echo ""
	@echo "Usage:"
	@echo "    make up          - Start all services in the background (Postgres)"
	@echo "    make down        - Stop and remove all services"
	@echo "    make stop        - Stop all services"
	@echo "    make run-server  - Run the Go backend server"
	@echo "    make run-next    - Run the Next.js frontend dev server"
	@echo "    make generate    - Run 'go generate' for Ent ORM"
	@echo "    make migrate-create name=<migration_name> - Create a new DB migration"
	@echo ""

# ====================================================================================
# DOCKER & ENVIRONMENT
# ====================================================================================

up:
	@echo "Starting Docker containers in detached mode..."
	docker-compose up -d

down:
	@echo "Stopping and removing Docker containers..."
	docker-compose down

stop:
	@echo "Stopping Docker containers..."
	docker-compose stop

# ====================================================================================
# DEVELOPMENT
# ====================================================================================

run-server:
	@echo "Starting Go server..."
	cd server && go run ./cmd/server

run-next:
	@echo "Starting Next.js dev server..."
	cd next-app && npm run dev

# ====================================================================================
# DATABASE & ORM
# ====================================================================================

generate:
	@echo "Generating Ent assets..."
	cd server && go generate ./...

migrate-create:
	@echo "Creating new migration: \${name}..."
	cd server && go run entgo.io/ent/cmd/ent migrate create \${name}

.PHONY: all dev up down stop run-server run-next generate migrate-create help