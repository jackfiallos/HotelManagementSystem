'use strict';

const Sequelize = require('sequelize');

const sequelize = new Sequelize('hms', 'root', 'mysqlubuntu', {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        max: 10,
        min: 0,
        idle: 10000
    },
    define: {
        timestamps: false, // true by default
        tableName: 'users',
        engine: 'MYISAM'
    }
});

const Users = sequelize.define('users', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
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

module.exports = Users;
