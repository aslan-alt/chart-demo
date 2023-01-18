

### How to start

Please follow the steps below to run `mongoDB` `server(node)` `client(React)`
#### run mongoDB
```shell
docker run -v "$PWD/mongo-data":/data/db -p 27017:27017 -e POSTGRES_HOST_AUTH_METHOD=trust -d mongo
docker exec -it containerID mongosh
```
#### run server
```
cd ./server
pnpm i
pnpm run:server
```
#### run client
```
cd ./client
pnpm i 
pnpm run:server
```