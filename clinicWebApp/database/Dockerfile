FROM registry.access.redhat.com/rhscl/postgresql-10-rhel7

ENV POSTGRES_DB clinic_database
ENV POSTGRES_USER postgres
ENV POSTGRES_PASSWORD clinic_database_pass

COPY init.sql /docker-entrypoint-initdb.d/

# Change permissions on directories
USER root
RUN chown -R postgres:postgres /var/lib/pgsql
USER postgres

# Expose the port specified in the FE_PORT environment variable or use defaultPort (3001) if not provided
ENV PORT=${DB_PORT:-5432}
EXPOSE $PORT
