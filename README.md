# Images converting system

## Up

From root scope of this project run command like below.

```
$ docker-compose up -d --build
```

Check with `ps`

```
$ docker-compose ps
     Name                    Command               State                    Ports                 
--------------------------------------------------------------------------------------------------
database          docker-entrypoint.sh redis ...   Up      6379/tcp                               
images_app_1      docker-entrypoint.sh sh -c ...   Up      0.0.0.0:5555->3000/tcp                 
images_worker_1   sh -c python worker.py           Up                                             
job-queue         docker-entrypoint.sh rabbi ...   Up      25672/tcp, 4369/tcp, 5671/tcp, 5672/tcp

```

## Usage

App server available at `http://localhost:5555` and serves 2 main functions:

- Upload an image
- Get image thumbnail by id

Upload image:

```
$ curl -F 'file=@/{path-to-your-image-from-root-/}' http://localhost:5555/image
7e5dbeb5-1cc7-49b7-9663-2f6f31fed767 // return an uuid for uploaded image
```

Get image thumbnail:

```
$ curl -XGET http://localhost:5555/image/{uploaded-image-uuid}/thumbnail > out.png
```

## Test web server

Note: please up the system before run test

```
$ cd webserver
$ yarn install
$ yarn test
```

## TODO

- [ ] Add more tests
- [ ] Persistent Store Redis DB
- [ ] Add check service status endpoints
