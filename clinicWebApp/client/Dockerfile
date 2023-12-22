# Use the official Node.js image as a base
FROM node:20.9.0-alpine3.18

# Set the working directory inside the container
WORKDIR /clinicWebApp/client

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the files to the working directory
COPY src ./src
COPY public ./public
COPY server.js ./

# Set the backend URL as an environment variable with the correct prefix
ENV REACT_APP_BACKEND_URL=${REACT_APP_BACKEND_URL:-https://clinic-web-server-mootazmwahab-dev.apps.sandbox-m3.1530.p1.openshiftapps.com}

# Build the frontend application
RUN npm run build

# Set the port for the server to listen on, with a default of 3001
ENV PORT=${FE_PORT:-3001}
# Expose the port specified in the FE_PORT environment variable or use defaultPort (3001) if not provided
EXPOSE $PORT

# Command to start the application
CMD ["node", "server.js"]
