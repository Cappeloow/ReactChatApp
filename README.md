# Chat application w/ React & Socket.io

### Link to GitHub repo: https://github.com/Cappeloow/ReactChatApp

### Project description:
This chatting application allows users to communicate with one another directly in real-time with the help of WebSockets. It's built using NodeJS, Express & Socket.io on the backend aswell as Socket.io and React (with TypeScript) on the frontend.

### How to (build and) run the application:
***Prerequisites:*** You will need NodeJS installed.

1. Install all the necessary dependencies using `npm install` in both the server/ and client/ directories.
2. While being located in the server/ directory start the backend server with `npm run start`
3. Then change directory into the client/ and start the frontend React app with `npm run dev`
4. Navigate to [**localhost:5173**](http://localhost:5173) on your preferred web browser to see the chat application in action!

### Get the `/gif` command to work:
This chat app comes with the feature of being able to send a random GIF as a message using the `/gif` command, but in order for it to work you will first need to have a personal API key from [**Gifphy** (you can create a free account incase you don't already have one and then simply retrive your API key)](https://developers.giphy.com/).

Next in the client/ directory create a *.env* file and inside of it type `VITE_API_KEY=` and after your Gifphy API key like the example below ⤵️

`VITE_API_KEY=Qcpks7CtHAogOzxUtcw2gIh3f92qUX19`