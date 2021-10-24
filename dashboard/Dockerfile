FROM node:12

# Create app directory
WORKDIR /usr/src/api

# Pass through backend URI from docker-compose.yml to frontend app
ARG REACT_APP_API_URI
ENV REACT_APP_API_URI $REACT_APP_API_URI

# Install app dependencies
# For production, RUN npm ci --only=production
COPY package*.json ./
RUN npm install

# Bundle app source
COPY . .

EXPOSE 3000
CMD ["npm", "start"]
