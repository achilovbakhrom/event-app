# EVENT APP

## Prerequisites

- Docker should be installed on your local machine.
- Make sure that 6379 and 5432 ports are not in use.

## Usage

<b>1. Using script:</b>

`chmod +x run.sh`
`./run.sh`

<b>Note</b>: If you want to stop and remove the services from your local machine there is a script for this purpose. 
`chmod +x clear && ./clear`

<b>2. Manually:</b>
   
Download the repository.
`cd backend`
`docker compose up`

To stop the services and remove containers u can use:
`docker compose down`

