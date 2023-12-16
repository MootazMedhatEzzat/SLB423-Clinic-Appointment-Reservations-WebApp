#!/bin/bash

# Create docker networks
docker network create ui-network
docker network create api-network

# Build and run database container
cd clinicWebApp/database
docker build -t clinic-web-database-image .
docker run -d -p 5432:5432 --name clinic-web-database-container -e PORT=5423 --network api-network -v clinic-web-data:/var/lib/postgresql/data clinic-web-database-image:latest

# Build and run backend server container
cd ../server
docker build -t clinic-web-server .
docker run -d -p 3000:3000 --name clinic-web-backend -e PORT=3000 --network api-network clinic-web-server:latest

# Connect backend server to ui-network
docker network connect ui-network clinic-web-backend

# Build and run frontend client container
cd ../client
docker build -t clinic-web-client .
docker run -d -p 3001:3001 --name clinic-web-frontend -e PORT=3001 --network ui-network clinic-web-client:latest

#listing images
docker images

#listing running containers
docker ps

# Return to the initial directory
cd ../..
