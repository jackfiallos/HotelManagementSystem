## Server Configuration

First of all, don´t forget to configure your **database** (look into the resource folder the schema)

### Installing Dependencies
```bash
$ npm install
```

### Running

To start the project, just run on your console
```bash
$ node run start
```

In case you need debugging, you can use chrome debugger through inspect plugin (don´t forget to enabled using chrome://inspect once you have ran the server)
```bash
$ node run inspect
```

### Logging

By default `node-bunyan` is used for logging to a file (`./logs/{{NODE_ENV}}-{{SERVER:NAME}}.log`). Additionally sending logs to Loggly is supported (take a look at the config file).

### Environments

`NODE_ENV` is not yet used to allow different configurations for development / production. The only thing it does is disabling the Auth- and CORS-Plugin in development.

```bash
$ NODE_ENV=production node app.js
```
