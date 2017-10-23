'use strict';

const Sequelize = require('sequelize');

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
        tableName: 'rooms',
        engine: 'MYISAM'
    }
});

const Rooms = sequelize.define('rooms', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    },
    currency: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'USD'
    },
    price_night: {
        type: Sequelize.DECIMAL(6,2),
        allowNull: false,
        defaultValue: 0
    },
    type: {
        type: Sequelize.ENUM(),
        values: ['standard', 'double'],
        allowNull: false,
        defaultValue: 'standard',
        set(val) {
            this.setDataValue('type', val.toLowerCase());
        }
    },
    max_persons: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 1
    }
});

module.exports = Rooms;
