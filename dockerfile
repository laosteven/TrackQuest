# Stage 1: Build Stage
FROM node:18-alpine AS build
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install all dependencies (including devDependencies)
RUN npm install

# Copy the rest of the source code
COPY . .

# Build the project
RUN npm run build

# Stage 2: Production Stage
FROM node:18-alpine AS production
WORKDIR /app

# Copy only the necessary files from the build stage
COPY --from=build /app/build ./build
COPY --from=build /app/package*.json ./

# Install only production dependencies
RUN npm install --production

# Expose the port
EXPOSE 3000

# Add a non-root user for security purposes
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

# Run the production server on the specified port
CMD ["node", "build"]
