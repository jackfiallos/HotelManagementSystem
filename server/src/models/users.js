'use strict';

const Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {
    const Users = sequelize.define('users', {
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
            type: Sequelize.STRING(50),
            allowNull: false,
            validate: {
                notEmpty: true,
                len: [3, 50]
            },
            get() {
                const name = this.getDataValue('name');
                return (name) ? name.charAt(0).toUpperCase() + name.slice(1) : null;
            }
        },
        lastname: {
            type: Sequelize.STRING(50),
            allowNull: false,
            validate: {
                notEmpty: true,
                len: [3, 50]
            },
            get() {
                const lastname = this.getDataValue('lastname');
                return (lastname) ? lastname.charAt(0).toUpperCase() + lastname.slice(1) : null;
            }
        },
        username: {
            type: Sequelize.STRING(20),
            allowNull: false,
            validate: {
                notEmpty: true,
                len: [4, 20]
            },
            set(val) {
                if (val) {
                    this.setDataValue('username', val.toLowerCase());
                }
            }
        },
        password: {
            type: Sequelize.STRING(100),
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        type: {
            type: Sequelize.ENUM(),
            values: ['admin', 'user'],
            allowNull: false,
            defaultValue: 'user',
            validate: {
                isIn: [['admin', 'user']],
            },
            set(val) {
                if (val) {
                    this.setDataValue('type', val.toLowerCase());
                }
            }
        },
        active: {
            type: Sequelize.BOOLEAN,
            allowNull: true,
            defaultValue: 0,
            get() {
                const isActive = this.getDataValue('active');
                return (isActive) ? true : false
            }
        },
    });

    return Users;
};
