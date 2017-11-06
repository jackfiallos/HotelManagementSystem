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
            allowNull: true,
            defaultValue: 'USD',
            validate: {
                len: [3,3]
            },
            set(val) {
                if (val) {
                    this.setDataValue('currency', val.toUpperCase());
                }
            }
        },
        price_night: {
            type: Sequelize.DECIMAL(6,2),
            allowNull: false,
            defaultValue: 0,
            validate: {
                isDecimal: true
            }
        },
        type: {
            type: Sequelize.ENUM(),
            values: ['standard', 'double', 'suite'],
            allowNull: false,
            defaultValue: 'standard',
            validate: {
                isIn: [['standard', 'double', 'suite']],
            },
            set(val) {
                if (val) {
                    this.setDataValue('type', val.toLowerCase());
                }
            }
        },
        max_guests: {
            type: Sequelize.INTEGER,
            allowNull: true,
            defaultValue: 1
        },
        available: {
            type: Sequelize.BOOLEAN,
            defaultValue: 1,
            get() {
                const isAvailable = this.getDataValue('available');
                return (isAvailable) ? true : false;
            }
        },
    });

    return Rooms;
};
