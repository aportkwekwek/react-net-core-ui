# Step 1: Use an official Node.js image as the base
FROM node:18-buster AS build

# Step 2: Set the working directory inside the container
WORKDIR /react-app

# Step 3: Copy the package.json and package-lock.json to install dependencies
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the rest of your application code
COPY . .

COPY public ./public

# Step 6: Build your React app
RUN npm run build

# Step 7: Serve the built app using a simple server like `serve`
RUN npm install -g serve

# Step 8: Expose port 3000 for serving the app
EXPOSE 80

# Step 9: Start the server and serve your app
CMD ["serve", "-s", "dist", "-l", "80"]