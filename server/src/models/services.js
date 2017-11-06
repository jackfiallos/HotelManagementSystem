'use strict';

const Sequelize = require('sequelize');
const Bookings = require('./bookings.js');
const Users = require('./users.js');

module.exports = function(sequelize, DataTypes) {
    const Services = sequelize.define('services', {
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
        description: {
            type: Sequelize.STRING(255),
            allowNull: false,
            validate: {
                len: [5, 255]
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
        amount: {
            type: Sequelize.DECIMAL(6,2),
            allowNull: false,
            validate: {
                isDecimal: true
            }
        },
        is_active: {
            type: Sequelize.BOOLEAN,
            defaultValue: 0,
            get() {
                const isActive = this.getDataValue('is_active');
                return (isActive) ? true : false
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
        }
    });

    return Services;
};
