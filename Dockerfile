FROM node:16.16.0

# Set the working directory
WORKDIR /app

# Copy package.json and yarn.lock
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install

# Copy the rest of the code
COPY . .

# Build the app
RUN yarn build

# Use the official lightweight Node.js 14 image for the runtime
FROM node:14-alpine

# Set the working directory
WORKDIR /app

# Install serve to run the application
RUN yarn global add serve

# Copy the build output from the build stage
COPY --from=0 /app/dist .

# Expose the serve port
EXPOSE 5000

# Run the app
CMD ["serve", "-s", ".", "-l", "5000"]
