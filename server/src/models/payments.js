'use strict';

const Sequelize = require('sequelize');
const Bookings = require('./bookings.js');
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
        tableName: 'payments',
        engine: 'MYISAM'
    }
});

const Payments = sequelize.define('payments', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    },
    amount: {
        type: Sequelize.DECIMAL(6,2),
        allowNull: false,
        validate: {
            isDecimal: true
        }
    },
    method: {
        type: Sequelize.ENUM(),
        values: ['cash', 'card', 'online'],
        allowNull: false,
        defaultValue: 'card',
        set(val) {
            this.setDataValue('method', val.toLowerCase());
        }
    },
    currency: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: 'USD',
    },
    source: {
        type: Sequelize.STRING,
        allowNull: true
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
    }
});

module.exports = Payments;
