faker-schema-refresh:
	docker-compose stop graphql-faker && docker rm graphql-faker && docker image rm graphql-faker && docker-compose up -d --build graphql-faker
dev-staging:
	docker compose up geyser-app caddy
dev-faker:
	docker compose up
	