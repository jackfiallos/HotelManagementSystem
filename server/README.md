# Hotel Management System

This project was created using restify and is basically an **API** secured with **JWT**, sequelizejs was selected as ORM and joi for user schema definitions to make data validations.

## Server Configuration

First of all, don´t forget to configure your **database** (look into the resource folder the schema), the sql file was generated to use MySQL or MariaDB.

### Installing Dependencies
```bash
$ npm install
```

### Setting up
Inside src/config there´s configuration environment variables

### Running

To start the project, just run on your console
```bash
$ node run start
```

In case you need to debug, you can use chrome debugger through inspect plugin (don´t forget to enabled using chrome://inspect once that you have ran the server)
```bash
$ node run inspect
```

### Logging

By default `node-bunyan` is used for logging to a file (`./logs/{{NODE_ENV}}-{{SERVER:NAME}}.log`).

### Environments

`NODE_ENV` is not yet used to allow different configurations for development / production. The only thing it does is disabling the Auth- and CORS-Plugin in development.

```bash
$ NODE_ENV=production node app.js
```

### Generate cert key files

Execute the next command

```bash
openssl genrsa -out server.key 2048
openssl rsa -in server.key -out server.pem -outform PEM -pubout
```

Once you have the keys, move the generated files into keys/ folder or whatever you want, just don´t forget to configure the right path.
