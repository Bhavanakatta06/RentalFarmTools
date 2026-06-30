# Stage 1: Build the React Application
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
# npm ci is faster and strictly follows package-lock.json
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine

# Remove default nginx config to override
RUN rm /etc/nginx/conf.d/default.conf

# Copy the built Vite assets from the previous stage
COPY --from=build /app/dist /usr/share/nginx/html

# Copy custom nginx configuration for reverse proxy
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]