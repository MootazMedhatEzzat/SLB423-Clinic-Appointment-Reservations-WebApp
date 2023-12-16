# Use the official PostgreSQL image from Docker Hub
FROM postgres:16-alpine3.18

# Set environment variables
ENV POSTGRES_DB clinic_database
ENV POSTGRES_USER postgres
ENV POSTGRES_PASSWORD clinic_database_pass

# Set a custom data directory
ENV PGDATA /var/lib/postgresql/custom-data

# Copy the SQL files to initialize the database
COPY init.sql /docker-entrypoint-initdb.d/

# Expose the port specified in the DB_PORT environment variable or use defaultPort (5432) if not provided
ENV PORT=${DB_PORT:-5432}
EXPOSE $PORT

# Run the entrypoint script as root to handle permission adjustments
USER root

# Use the custom data directory
CMD ["postgres", "-c", "config_file=/var/lib/postgresql/custom-data/postgresql.conf"]
