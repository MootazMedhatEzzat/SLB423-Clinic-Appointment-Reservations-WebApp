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

# Expose the port on which the application will run
EXPOSE 3000

# Command to start the application
CMD ["node", "server.js"]
