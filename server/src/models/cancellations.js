'use strict';

const Sequelize = require('sequelize');
const Bookings = require('./bookings');
const Rooms = require('./rooms.js');
const Customers = require('./customers.js');
const Users = require('./users.js');

module.exports = function(sequelize, DataTypes) {
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

    return Cancelations;
};
