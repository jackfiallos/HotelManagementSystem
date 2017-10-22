'use strict';

const Sequelize = require('sequelize');
const sequelize = new Sequelize('mysql://root:mysqlubuntu@localhost:3306/hms', {
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
    }
});

module.exports = Users;
