# ---- Development stage ----
FROM node:20-alpine

# Set working directory
WORKDIR /usr/src/app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the source code
COPY . .

# Expose Vite dev server port
EXPOSE 8080

# Start Vite dev server
CMD ["npm", "run", "dev", "--", "--host"]
