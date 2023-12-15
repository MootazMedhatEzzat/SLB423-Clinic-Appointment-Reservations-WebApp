# Use the official PostgreSQL image from Docker Hub
FROM postgres:16-alpine3.18

# Set environment variables
ENV POSTGRES_DB clinic_database
ENV POSTGRES_USER postgres
ENV POSTGRES_PASSWORD clinic_database_pass

# Change ownership of the directories
RUN chown -R postgres:postgres /var/lib/postgresql/data /var/run/postgresql

# Switch to the postgres user for security reasons
USER postgres

# Copy the SQL files to initialize the database
COPY init.sql /docker-entrypoint-initdb.d/

# Expose the port specified in the FE_PORT environment variable or use defaultPort (3001) if not provided
ENV PORT=${DB_PORT:-5432}
EXPOSE $PORT
