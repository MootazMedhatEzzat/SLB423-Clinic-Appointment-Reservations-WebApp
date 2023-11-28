# Use the official PostgreSQL image from Docker Hub
FROM postgres:16-alpine3.18

# Set environment variables
ENV POSTGRES_DB clinic_appointments_reservations
ENV POSTGRES_USER postgres
ENV POSTGRES_PASSWORD clinic_appointments_reservations_password

# Copy the SQL files to initialize the database
COPY init.sql /docker-entrypoint-initdb.d/

# Expose the PostgreSQL port
EXPOSE 5432
