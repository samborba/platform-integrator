
# Platform Integrator
## Requirements
You may start the server locally or using a docker container, the requirements for each setup are listed below.

### Local
-  [Latest Node.js](https://nodejs.org/en/download/)

### Docker
-  [Docker CE](https://www.docker.com/get-docker)

## Quick Start

Make sure you have all requirements installed on your computer. Then, you may start the server using either a [Docker container](https://github.com/platiagro/projects#run-using-docker) or in your [local machine](https://github.com/platiagro/projects#run-local).

### Run using Docker
Export these environment variables:

``` bash
export DOJOT_ENDPOINT=dojot
export DOJOT_USERNAME=admin
export DOJOT_PASSWORD=admin
export SERVER_KEY=dfd7a767-a20c-4424-bf1b-287071218de1
export SERVER_PORT=3030
export APP_PORT=3333
export MQTT_PORT=1883
```

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
--env "SERVER_PORT=$SERVER_PORT" \
--env "SERVER_KEY=$SERVER_KEY" \
--env "SERVER_PORT=$SERVER_PORT" \
--env "APP_PORT=$APP_PORT" \
--env "MQTT_PORT=$MQTT_PORT"
platiagro/dojot-integration:0.1.0
```

### Run Local:
Export these environment variables:
``` bash
export DOJOT_ENDPOINT=dojot
export DOJOT_USERNAME=admin
export DOJOT_PASSWORD=admin
export APP_PORT=3333
export SERVER_PORT=3030
export SERVER_KEY=dfd7a767-a20c-4424-bf1b-287071218de1
export MQTT_PORT=1883
```

Install Node.js modules:
```bash
npm install
```
Then, start the API server:
```bash
npm start
```
#### Start a New Integration:
To create a new "integration", just make a POST request in `/api/v1/integrations` with the following body as `JSON` format:

POST body:

```json
{
  "origin": "1fa592",
  "destination": "9fa548",
  "experimentURL": "http://awsplatiagro04/seldon/deployments/bf06c9e3-78d3-422b-8a1e-6f3909add993/api/v1.0/predictions"
}
```
Response body:
```json
{
  "message": "Integration was started",
  "integration": {
    "uuid": "6a903a7a-c5ac-475b-bf8e-b6fa72fb22f3",
    "origin": "1fa592",
    "destination": "9fa548",
    "experimentURL": "http://awsplatiagro04/seldon/deployments/bf06c9e3-78d3-422b-8a1e-6f3909add993/api/v1.0/predictions"
  }
}
```
#### Retrieve Integrations:
To retrieve all integrations and their details, make a GET Request at `/api/v1/integrations`:

Response body:
```json
{
  "integrations": [
    {
      "uuid": "427c908d-9624-4721-b67b-980b6989e6ee",
      "origin": "Prometheus",
      "destination": "Athenas",
      "experimentURL": "http://awsplatiagro04/seldon/deployments/59a44281-3055-4907-b890-7df7c1a328d4/api/v1.0/predictions",
      "status": "Running",
      "createdAt": "2020-10-13T20:02:49.000Z",
      "finishedAt": "2020-10-13T20:02:49.000Z"
    },
    {
      "uuid": "a2f626c9-5e08-4eca-a5d7-5aa6baaa7982",
      "origin": "Selene",
      "destination": "Eros",
      "experimentURL": "http://awsplatiagro02/seldon/deployments/8417e9d0-2ac9-41cb-8e1d-a5a89ef68212/api/v1.0/predictions",
      "status": "Stopped",
      "createdAt": "2020-10-13T20:02:49.000Z",
      "finishedAt": "2020-10-13T20:02:49.000Z"
    }
  ]
}
```
___
#### Request Summary:
 - origin: real device, where the data is being generated/transmitted from;
- destination: **virtual device** created at Dojot to **only receive data** generated from the model implanted in the platiagro;
- experimentURL: URL of the experiment deployment created at PlatIAgro;

*For more details on how to use any of the platforms, please, check [PlatIAgro](https://platiagro.github.io/docs/experiments/) and [Dojot documentation](https://dojotdocs.readthedocs.io/en/latest/using-web-interface.html).*
___
