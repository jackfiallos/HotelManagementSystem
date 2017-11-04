'use strict';

const Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {
    const Rooms = sequelize.define('rooms', {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        created_at: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
        },
        name: {
            type: Sequelize.STRING(20),
            allowNull: false,
            validate: {
                notEmpty: true,
                len: [3, 20]
            }
        },
        currency: {
            type: Sequelize.STRING(3),
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
        },
        available: {
            type: Sequelize.BOOLEAN,
            defaultValue: 1,
            get() {
                const isAvailable = this.getDataValue('available');
                return (isAvailable) ? 'yes' : 'no'
            }
        },
    });

    return Rooms;
};
