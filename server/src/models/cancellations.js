'use strict';

const Sequelize = require('sequelize');
const sequelize = new Sequelize('mysql://root:mysqlubuntu@localhost:3306/hms', {
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
    booking_id: {
        type: Sequelize.INTEGER,
        allowNull: false
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
    },
});

module.exports = Cancelations;
