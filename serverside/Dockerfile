# Backend Dockerfile

# Use an official Node.js image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json first to cache dependencies
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the full source code
COPY . .

# Expose the port the Express app runs on
EXPOSE 3000

# Start the Express server
CMD ["npm", "start"]
