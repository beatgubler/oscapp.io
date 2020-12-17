# oscapp.io

## Description
An opensource fullstack project built on MongoDB, Express, Angular and NodeJS.
The point of this project is, to learn and build an opensource chat-application.
It is meant to be run on a single machine with a MongoDB in the cloud, so that  everyone can build/run/develop/deploy it.

Feel free to leave your suggestions, problems, safety concerns or questions in the respected section here on Github.

## Features:
* live chat-application with websockets
* responsive design (mobile friendly)
* admin-section to manage users and messages
* persistent login with JWT-Authentication (shortlife) and JWT-RefreshToken (longlife)
* RESTful API


#### Livepreview: [https://chat.gubler-it.com](https://chat.gubler-it.com)
![Version](https://img.shields.io/badge/Version-v0.8.2-green)
Optimized for Angular 9.1.1 & Node 12.16.2

![oscapp.io [Preview]](https://i.imgur.com/5aglXqM.png)

## Installation
* Install NodeJS -> https://nodejs.org/en/download/
* Insall angular/cli -> **npm install -g @angular/cli**
* Clone this project with **git clone https://github.com/beatgubler/chatroom.io.git** or download manually
* change settings in server.js
  * set crypto iv: const iv = "[random_string]" //max. 16 characters
  * set crypto password: const password = "[random_string]" 
  * set jwt secret: const secret = "[random_string]"
  * set MongoDB connection string: const db = "mongodb+srv://[username]:[password]@[cluster].mongodb.net/[database]?retryWrites=true&w=majority"
* Inside the app directory -> **npm install** -> **ng serve**
* Inside the server directory -> **npm install** -> **node server**

## Details
The repo is split into two folder, refered to as app (Angular App) and server (NodeJS Server).

### External dependencies
#### App
* ngx-cookie-service - https://www.npmjs.com/package/ngx-cookie-service
* ngx-socket-io - https://www.npmjs.com/package/ngx-socket-io
#### Server
* express - https://www.npmjs.com/package/express
* body-parser - https://www.npmjs.com/package/body-parser
* jsonwebtoken - https://www.npmjs.com/package/jsonwebtoken
* cors - https://www.npmjs.com/package/cors
* socket.io - https://www.npmjs.com/package/socket.io
* mongoose - https://www.npmjs.com/package/mongoose
* multer - https://www.npmjs.com/package/multer

## Known issues
* Chat not working in Internet Explorer
