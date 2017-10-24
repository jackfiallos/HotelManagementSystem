'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';

// Read configuration file
const nconf = require('nconf').file({
    file: path.join(__dirname, '..', 'config', `${env}.config.json`)
});

// Configure db connection
const sequelize = new Sequelize(nconf.get('DB:name'), nconf.get('DB:username'), nconf.get('DB:password'), nconf.get('DB:config'));
var db = {};

// Read and load model files (avoid index.js)
fs.readdirSync(__dirname).filter((file) => {
    return (file.indexOf(".") !== 0) && (file !== 'index.js');
}).forEach((file) => {
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
});

// Add associations If the current table has it
Object.keys(db).forEach((modelName) => {
    if ('associate' in db[modelName]) {
        db[modelName].associate(db);
    }
});

db.Sequelize = Sequelize;

module.exports = db;
