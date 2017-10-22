'use strict';

const Sequelize = require('sequelize');
const sequelize = new Sequelize('mysql://root:mysqlubuntu@localhost:3306/hms', {
    define: {
        timestamps: false, // true by default
        tableName: 'bookings',
        engine: 'MYISAM'
    }
});

const Bookings = sequelize.define('bookings', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    },
    arrival: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: true
    },
    departure: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: true
    },
    checkin: {
        type: Sequelize.DATE,
        validate: {
            isDate: true
        }
    },
    checkout: {
        type: Sequelize.DATE,
        validate: {
            isDate: true
        }
    },
    breakfast: {
        type: Sequelize.BOOLEAN,
        defaultValue: 0
    },
    nights: {
        type: Sequelize.INTEGER,
        defaultValue: 1
    },
    adults: {
        type: Sequelize.INTEGER,
        defaultValue: 1
    },
    children: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    comments: {
        type: Sequelize.TEXT,
        validate: {
            notEmpty: true,
        }
    },
    room_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    customer_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    user_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

module.exports = Bookings;
