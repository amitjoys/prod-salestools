# Use an official Node runtime as a parent image for building the frontend and backend
FROM node:14 AS build

# Set working directory for frontend
WORKDIR /app/frontend

# Copy frontend package files
COPY replica/package*.json ./

# Install frontend dependencies
RUN npm install

# Copy the rest of the frontend code
COPY replica ./
RUN npm install --save-dev @types/react-helmet

# Build the frontend
RUN npm run build

# Set working directory for backend
WORKDIR /app/backend

# Copy backend package files
COPY serverside/package*.json ./

# Install backend dependencies
RUN npm install

# Copy the rest of the backend code
COPY serverside ./

# Expose ports for frontend and backend
EXPOSE 3000 5000

# Final stage to create the runtime image
FROM node:14

# Set working directory
WORKDIR /app

# Copy the build artifacts from the frontend and backend stages
COPY --from=build /app/frontend/build ./frontend/build
COPY --from=build /app/backend ./backend

# Install serve to serve frontend
RUN npm install -g serve

# Create a startup script
RUN echo '#!/bin/sh' > /start.sh
RUN echo 'cd /app/backend && npm start &' >> /start.sh
RUN echo 'serve -s /app/frontend/build -l 3000' >> /start.sh
RUN chmod +x /start.sh

# Expose ports
EXPOSE 3000 5000

# Set the startup script as the entry point
CMD ["/start.sh"]
