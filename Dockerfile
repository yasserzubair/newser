# base image node 20
FROM node:20 AS build
# Set the working directory
WORKDIR /newser
# Copy the package.json file
COPY package.json ./
# Copy the yarn.lock file
COPY yarn.lock ./
# Install deps with yarn
RUN yarn
# Copy the rest of the application code
COPY . .
# Building nextjs app
RUN yarn run build
# Expose instance's port
EXPOSE 3000
# Start Nginx server
CMD ["yarn", "start"]
