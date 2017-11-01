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
            allowNull: false
        },
        password: {
            type: Sequelize.STRING(100),
            allowNull: false
        },
        type: {
            type: Sequelize.ENUM(),
            values: ['admin', 'user'],
            allowNull: false,
            defaultValue: 'user',
            set(val) {
                this.setDataValue('type', val.toLowerCase());
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
