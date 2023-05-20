# Spring and react starter pack

## Dev
- Start the database in Docker `docker-start-dev.cmd`
- Start the server in `Debug` mode in `VS Code`. It will be available on port `8080`.
- Front run by:
```
cd src/main/frontend
yarn start
```
The front will be available at the port: `http://localhost:3000`

## Prod
1. Build the backend (`Maven`)
2. Build the frontend (`yarn build`)
3. Run docker-compose `docker-start-all.cmd`