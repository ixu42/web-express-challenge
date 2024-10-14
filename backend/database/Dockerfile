# Use the official PostgreSQL image from the Docker Hub
FROM postgres:bookworm

# Environment variables for the default database and user
ENV POSTGRES_DB=pokemon-db
ENV POSTGRES_USER=youruser
ENV POSTGRES_PASSWORD=yourpassword

# Copy the initialization SQL script to the Docker image
COPY init.sql /docker-entrypoint-initdb.d/