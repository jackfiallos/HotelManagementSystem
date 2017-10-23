'use strict';

const Sequelize = require('sequelize');
const Bookings = require('./bookings');
const Rooms = require('./rooms.js');
const Customers = require('./customers.js');
const Users = require('./users.js');

const sequelize = new Sequelize('hms', 'root', 'mysqlubuntu', {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        max: 10,
        min: 0,
        idle: 10000
    },
    define: {
        timestamps: false, // true by default
        tableName: 'cancellations',
        engine: 'MYISAM'
    }
});

const Cancelations = sequelize.define('cancellations', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    },
    comments: {
        type: Sequelize.TEXT,
        validate: {
            notEmpty: true,
        }
    },
    booking_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: Bookings,
            key: 'id',
        }
    },
    user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: Users,
            key: 'id',
        }
    },
});

module.exports = Cancelations;
