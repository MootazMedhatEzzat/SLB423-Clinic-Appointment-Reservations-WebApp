# Use the official PostgreSQL image from Docker Hub
FROM postgres:16-alpine3.18

# Set environment variables
ENV POSTGRES_DB clinic_database
ENV POSTGRES_USER postgres
ENV POSTGRES_PASSWORD clinic_database_pass

# Copy the SQL files to initialize the database
COPY init.sql /docker-entrypoint-initdb.d/

# Change ownership of the necessary directories to the non-root user used by PostgreSQL
RUN chown -R postgres:postgres /var/lib/postgresql/data /var/run/postgresql

# Expose the port specified in the DB_PORT environment variable or use defaultPort (5432) if not provided
ENV PORT=${DB_PORT:-5432}
EXPOSE $PORT
