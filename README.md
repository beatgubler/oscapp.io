# oscapp.io

## Description
An opensource fullstack project built on MongoDB, Express, Angular and NodeJS.
The point of this project is, to learn and build an opensource chat-application.
It is meant to be run on a single machine with a MongoDB in the cloud, so that  everyone can build/run/develop/deploy it.

Feel free to leave your suggestions, problems, safety concerns or questions in the respected section here on Github.

The Server/API can be found here: https://github.com/beatgubler/oscapp.io-server

## Features:
* live chat-application with websockets
* responsive design (mobile friendly)
* admin-section to manage users and messages
* persistent login with JWT-Authentication (shortlife) and JWT-RefreshToken (longlife)
* RESTful API


#### Livepreview: [https://chat.gubler-it.com](https://chat.gubler-it.com)
![Version](https://img.shields.io/badge/Version-v0.8.3-green)
Optimized for Angular 9.1.1 & Node 12.16.2

![oscapp.io [Preview]](https://i.imgur.com/5aglXqM.png)

## Installation
* Install NodeJS -> https://nodejs.org/en/download/
* Install angular/cli -> **npm install -g @angular/cli**
* Clone this project with **git clone https://github.com/beatgubler/oscapp.io-app.git** or download manually
**npm install** -> **ng serve**


## External dependencies
* ngx-cookie-service - https://www.npmjs.com/package/ngx-cookie-service
* ngx-socket-io - https://www.npmjs.com/package/ngx-socket-io


## Known issues
* Chat not working in Internet Explorer
