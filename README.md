# PlatIAoT
PlatIAot is a scalable server capable of integrating the @dojot IoT platform and the artificial intelligence platform for agribusiness @Platiagro. The project is built using Node.js and makes use of Socket.IO library for bidirectional transmission in real time between platforms and Express.js framework for request handler.

The sequence diagram below contains a sequence diagram with only two clients:
![How it works](docs/assets/how-it-works.png)

## How it works
PlatIAoT is composed of 2 clients (or more) and 1 server, in which they communicate through the [WebSocket](https://developer.mozilla.org/pt-BR/docs/WebSockets) protocol (and polling as a fallback option). For each platform, there is an existing client on which it communicates with a server, using it as an intermediary to redirect data.

## Configuring the application
### Installation of dependencies
Before starting to use the server, it is necessary to install the dependencies required by the application::
1. Install Node.js interpreter (Check [website](https://nodejs.org/en/download/package-manager/) and select the version according to your operating system)
2. Clone this repository and go to the root of the project
3. Install the dependencies that are in the package.json file by running the command ``npm install``

### PlatIAoT Environment
At the root of the project it contains the file **config.json.example**, where it contains all the authentication and connection information that the application will need. Just fill in all the fields with their respective values, and immediately after, remove the **.example** extension from the file name.

### Dojot Environment
### PlatIAgro Environment

## How to use
Just run the command ``npm start`` on your terminal. The server address will be available on the host along with the port you entered in the config.json file.