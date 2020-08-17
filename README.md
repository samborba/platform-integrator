# Platform Integrator

## Requirements

You may start the server locally or using a docker container, the requirements for each setup are listed below.

### Local

- [Latest Node.js](https://nodejs.org/en/download/) 

### Docker
 - [Docker CE](https://www.docker.com/get-docker)

## Quick Start
Make sure you have all requirements installed on your computer. Then, you may start the server using either a [Docker container](https://github.com/platiagro/projects#run-using-docker) or in your [local machine](https://github.com/platiagro/projects#run-local).

### Run using Docker
Export these environment variables:
``` bash
export DOJOT_ENDPOINT=localhost:8000
export DOJOT_USERNAME=admin
export DOJOT_PASSWORD=admin
export DOJOT_DEVICE=all
export PLATIAGRO_ENDPOINT=platiagro
export EXPERIMENT_ID=dfd7a767-a20c-4424-bf1b-287071218de1
export SERVER_PORT=3030
export SERVER_KEY=dfd7a767-a20c-4424-bf1b-287071218de1
```
Notes: DOJOT_DEVICE refers to the device you are listening to, it can be "all" to hear all registered or else the specific id of a device. SERVER_KEY is the uuid that will be the secret key to access your server and the EXPERIMENT_ID is the model to be used in the PlatIAgro API.

Then, build a docker image that launches the API server:
```bash
docker build -t platiagro/dojot-integration:0.1.0 .
```
Finally, start the API server:
```bash
docker run -it -p 3030:3030 \                                                        
  --name integrator \
  --env "DOJOT_ENDPOINT=$DOJOT_ENDPOINT" \
  --env "DOJOT_USERNAME=$DOJOT_USERNAME" \
  --env "DOJOT_PASSWORD=$DOJOT_PASSWORD" \
  --env "DOJOT_DEVICE=$DOJOT_DEVICE" \
  --env "PLATIAGRO_ENDPOINT=$PLATIAGRO_ENDPOINT" \
  --env "EXPERIMENT_ID=$EXPERIMENT_ID" \
  --env "SERVER_PORT=$SERVER_PORT" \
  --env "SERVER_KEY=$SERVER_KEY" \
  platiagro/dojot-integration:0.1.0
```
### Run Local:

Export these environment variables:
``` bash
export DOJOT_ENDPOINT=localhost:8000
export DOJOT_USERNAME=admin
export DOJOT_PASSWORD=admin
export DOJOT_DEVICE=all
export PLATIAGRO_ENDPOINT=platiagro
export EXPERIMENT_ID=dfd7a767-a20c-4424-bf1b-287071218de1
export SERVER_PORT=3030
export SERVER_KEY=dfd7a767-a20c-4424-bf1b-287071218de1
```
Install Node.js modules:
```bash
npm install
```
Then, start the API server:
```bash
npm start
```