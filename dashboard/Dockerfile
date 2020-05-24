FROM node:12

# Create app directory
WORKDIR /usr/src/api

# Install app dependencies
# For production, RUN npm ci --only=production
COPY package*.json ./
RUN npm install

# Bundle app source
COPY . .

EXPOSE 3000
CMD ["npm", "start"]
