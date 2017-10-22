'use strict';

const Sequelize = require('sequelize');
const Users = require('./users.js');
const sequelize = new Sequelize('mysql://root:mysqlubuntu@localhost:3306/hms', {
    define: {
        timestamps: false, // true by default
        tableName: 'customers',
        engine: 'MYISAM'
    }
});

const Customers = sequelize.define('customers', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    },
    first_name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [3, 50]
        }
    },
    last_name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [3, 50]
        }
    },
    phone: {
        type: Sequelize.STRING,
        allowNull: true
    },
    mobile: {
        type: Sequelize.STRING,
        allowNull: true
    },
    city: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [3, 50]
        }
    },
    country: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [3, 50]
        }
    },
    email: {
        type: Sequelize.STRING,
        allowNull: true,
        validate: {
            isEmail: true,
        }
    },
    organization: {
        type: Sequelize.STRING,
        allowNull: true,
        validate: {
            notEmpty: true,
            len: [5, 50]
        }
    },
    user_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
            model: Users,
            key: 'id',
        }
    }
});

module.exports = Customers;
