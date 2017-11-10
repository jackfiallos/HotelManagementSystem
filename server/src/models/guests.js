'use strict';

const Sequelize = require('sequelize');
const Users = require('./users.js');

module.exports = function(sequelize, DataTypes) {
    const Guests = sequelize.define('guests', {
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
        first_name: {
            type: Sequelize.STRING(50),
            allowNull: false,
            validate: {
                notEmpty: true,
                len: [3, 50]
            }
        },
        last_name: {
            type: Sequelize.STRING(50),
            allowNull: false,
            validate: {
                notEmpty: true,
                len: [3, 50]
            }
        },
        phone: {
            type: Sequelize.STRING(30),
            allowNull: true,
            validate: {
                len: [5, 50]
            }
        },
        mobile: {
            type: Sequelize.STRING(30),
            allowNull: true,
            validate: {
                len: [5, 50]
            }
        },
        city: {
            type: Sequelize.STRING(50),
            allowNull: false,
            validate: {
                notEmpty: true,
                len: [2, 50]
            }
        },
        country: {
            type: Sequelize.STRING(50),
            allowNull: false,
            validate: {
                notEmpty: true,
                len: [2, 50]
            }
        },
        email: {
            type: Sequelize.STRING(100),
            allowNull: true,
            validate: {
                isEmail: true,
            },
            set(val) {
                if (val) {
                    this.setDataValue('email', val.toLowerCase());
                }
            },
            get() {
                const email = this.getDataValue('email');
                return (email) ? email : '';
            }
        },
        organization: {
            type: Sequelize.STRING(50),
            allowNull: true,
            validate: {
                notEmpty: true,
                len: [2, 50]
            }
        },
        age: {
            type: Sequelize.INTEGER,
            allowNull: true,
            validate: {
                isNumeric: true
            }
        },
        gender: {
            type: Sequelize.ENUM(),
            values: ['M', 'F'],
            validate: {
                isIn: [['M', 'F']],
            },
            set(val) {
                if (val) {
                    this.setDataValue('gender', val.toUpperCase());
                }
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
                key: 'id',
            }
        }
    });

    Guests.associate = function(models) {
        Guests.belongsTo(models.users, {
            as: 'user',
            foreignKey: 'user_id'
        });
    }

    return Guests;
};
