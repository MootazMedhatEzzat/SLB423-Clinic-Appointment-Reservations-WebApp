# Use the official Node.js image as a base
FROM node:20.9.0-alpine3.18

# Set the working directory inside the container
WORKDIR /clinicWebApp/server

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the files to the working directory
COPY src ./src
COPY database.js ./
COPY server.js ./

# Expose the port specified in the BE_PORT environment variable or use defaultPort (3000) if not provided
ENV PORT=${BE_PORT:-3000}
EXPOSE $PORT

# Command to start the application
CMD ["node", "server.js"]
