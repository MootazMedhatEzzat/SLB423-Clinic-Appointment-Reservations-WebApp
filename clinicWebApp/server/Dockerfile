FROM node:18-alpine3.18

WORKDIR /node-docker-example/

# Copy package.json and package-lock.json to leverage Docker cache
COPY . /node-docker-example/

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Expose the port
EXPOSE 3000

# Run the application using a non-root user
CMD ["npm", "start"]
