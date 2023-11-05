# EVENT APP

## Prerequisites

- Docker should be installed on your local machine.
- Make sure that `6379`, `5432`, `3000` and `8080` ports are not in use.

## Installation

**1. Using script:** <br />

`chmod +x run.sh` <br />
`./run.sh`

**Note**: If you want to stop and remove the services from your local machine there is a script for this purpose. 
`chmod +x clear && ./clear`

**1. Manually:**
   
Download the repository. <br />
`cd backend` <br />
`docker compose up` <br />

To stop the services and remove containers u can use: <br />
`docker compose down`

## Usage

**Frontend:**
`http://locahost:8080`

**Swagger:**
`http://locahost:3000/api`

**Graphql:**
`http://locahost:3000/graphql`