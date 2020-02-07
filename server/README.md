# Hotel Management System

This project was created using restify and is basically an **API** secured with **JWT**, sequelizejs was selected as ORM and joi for user schema definitions to make data validations.

## Server Configuration

First of all, don't forget to configure your **database** (look into the resource folder the schema), the sql file was generated to use MySQL or MariaDB.

### Installing Dependencies

```bash
$ npm install
```

### Setting up

Inside src/config there's configuration environment variables, setup your database here.

### Running

To start the project, just run on your console
```bash
$ npm start
```

In case you need to debug, you can use chrome debugger through inspect plugin (don't forget to enabled using chrome://inspect once that you have ran the server)
```bash
$ npm run inspect
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

Once you have the keys, move the generated files into keys/ folder or whatever you want, just don't forget to configure the right path into src/config/{development | production}.config.json

### Known issues

There's an issue with bunyan, to fix this you will need to read this link:
https://github.com/trentm/node-bunyan/issues/525#issuecomment-319861355

and if your configuration file is ok, just execute npm start to run the project

### General Instructions

Inside src/controllers you will find all different routes enabled organized by folder, the most important at the begining is home which is used to register users and login them.

Once the server is running locally the api is ready to be consumed at the port 1337

**Registering users**

	POST http://[::]:1337/register
	Content-Type: application/json


```json
{
	"username": "jackfiallos",
	"password": "123456",
	"name": "Jack",
	"lastname": "Fiallos",
	"type": "admin"
}
```

By default new users are created with the active flag 0/false, meaning the user is inactive (you can change this directly in your local DB in order to let the user login).

Also, exist 2 different types of users, "admin" and "user" (this was created intentionally thinking in mind roles / a future feature)

**Login users**

	POST http://[::]:1337/
	Content-Type: application/json


```json
{
	"username": "jackfiallos",
	"password": "123456"
}
```

If the credentials given are ok, the server will return a valid token that needs to be used to make any other request.

**Making requests**

All api endpoints are secure and you will need the token to call them, so once you get a token after login, in every request you need to send the token using the "Authorization" header with the value "BEARER {token}".

