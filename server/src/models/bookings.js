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
            defaultValue: true,
            validate: {
                isDate: true,
            }
        },
        checkout: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: true,
            validate: {
                isDate: true,
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
        breakfast: {
            type: Sequelize.BOOLEAN,
            defaultValue: 1
        },
        nights: {
            type: Sequelize.INTEGER,
            defaultValue: 1,
            validate: {
                isNumeric: true
            }
        },
        adults: {
            type: Sequelize.INTEGER,
            defaultValue: 1,
            validate: {
                isNumeric: true
            }
        },
        children: {
            type: Sequelize.INTEGER,
            defaultValue: 0,
            validate: {
                isNumeric: true
            }
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
            validate: {
                isIn: [['online', 'phone', 'agency', 'desk']],
            },
            set(val) {
                if (val) {
                    this.setDataValue('type', val.toLowerCase());
                }
            }
        },
        confirmed: {
            type: Sequelize.BOOLEAN,
            defaultValue: 0
        },
        guest_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            validate: {
                isNumeric: true
            },
            references: {
                model: Guests,
                key: 'id',
            }
        },
        user_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            validate: {
                isNumeric: true
            },
            references: {
                model: Users,
                key: 'id'
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
