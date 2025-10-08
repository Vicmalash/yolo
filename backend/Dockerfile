FROM node:22.19.0-alpine

# Setup working directory
WORKDIR /app

# Copy dependency files
COPY package*.json ./

# Install dependencies 
RUN npm install --production

# Copy the rest of the backend source code
COPY . .

# Set backend port
EXPOSE 5000

# run the application
CMD ["node", "server.js"]

