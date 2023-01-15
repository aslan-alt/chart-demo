
### run mongoDB
```shell
docker run -v "$PWD/mongo-data":/data/db -p 27017:27017 -e POSTGRES_HOST_AUTH_METHOD=trust -d mongo
docker exec -it containerID mongosh
```