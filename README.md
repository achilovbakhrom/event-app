# EVENT APP

## Prerequisites

- Docker should be installed on your local machine.
- Make sure that 6379 and 5432 ports are not in use.

## Usage

<b>1. Using script:</b> <br />

`chmod +x run.sh` <br />
`./run.sh`

<b>Note</b>: If you want to stop and remove the services from your local machine there is a script for this purpose. 
`chmod +x clear && ./clear`

<b>2. Manually:</b>
   
Download the repository. <br />
`cd backend` <br />
`docker compose up` <br />

To stop the services and remove containers u can use: <br />
`docker compose down`

