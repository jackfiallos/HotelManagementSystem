'use strict';

const Sequelize = require('sequelize');
const Rooms = require('./rooms.js');
const Guests = require('./guests.js');
const Users = require('./users.js');

module.exports = function(sequelize, DataTypes) {
    const Bookings = sequelize.define('bookings', {
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
        checkin: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: true
        },
        checkout: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: true
        },
        currency: {
            type: Sequelize.STRING(3),
            allowNull: false,
            defaultValue: 'USD'
        },
        amount: {
            type: Sequelize.DECIMAL(6,2),
            allowNull: false,
            validate: {
                isDecimal: true
            }
        },
        breakfast: {
            type: Sequelize.BOOLEAN,
            defaultValue: 0,
            get() {
                const hasBreakfast = this.getDataValue('breakfast');
                return (hasBreakfast) ? 'yes' : 'no'
            }
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
        type: {
            type: Sequelize.ENUM(),
            values: ['online', 'phone', 'agency', 'desk'],
            allowNull: true,
            defaultValue: 'desk',
            set(val) {
                this.setDataValue('type', val.toLowerCase());
            }
        },
        confirmed: {
            type: Sequelize.BOOLEAN,
            defaultValue: 0,
            get() {
                const isConfirmed = this.getDataValue('confirmed');
                return (isConfirmed) ? 'yes' : 'no'
            }
        },
        guest_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: Guests,
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

    Bookings.associate = function(models) {
        Bookings.belongsToMany(models.rooms, {
            as: 'room',
            through: 'bookings_has_rooms',
            foreignKey: 'booking_id',
            otherKey: 'room_id'
        })

        Bookings.belongsTo(models.guests, {
            as: 'guest',
            foreignKey: 'guest_id'
        });

        Bookings.belongsTo(models.users, {
            as: 'user',
            foreignKey: 'user_id'
        });
    }

    return Bookings;
};
