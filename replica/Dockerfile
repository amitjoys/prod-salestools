# Frontend Dockerfile

# Step 1: Use an official Node.js image as a parent image for building the frontend
FROM node:18-alpine AS builder

# Step 2: Set the working directory in the builder container
WORKDIR /app

# Step 3: Copy package.json and package-lock.json (if available)
COPY package.json package-lock.json ./

# Step 4: Install the dependencies
RUN npm install

# Step 5: Copy the rest of the application code to the container
COPY . .

# Step 6: Set environment variable for Vite backend URL (passed during build or from Docker Compose)
ARG VITE_BACKEND_URL
ENV VITE_BACKEND_URL=${VITE_BACKEND_URL}

# Step 7: Build the frontend (Vite will pick up the VITE_BACKEND_URL during the build)
RUN npm run build

# Step 8: Use Nginx to serve the build files
FROM nginx:alpine

COPY nginx.conf /etc/nginx/nginx.conf

# Step 9: Copy the built files from the builder stage to the Nginx container
COPY --from=builder /app/dist /usr/share/nginx/html

# Step 10: Expose port 80 to the outside world
EXPOSE 80

# Step 11: Start Nginx automatically
CMD ["nginx", "-g", "daemon off;"]
