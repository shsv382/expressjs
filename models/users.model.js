const sequelize = require('../db');
const { DataTypes } = require('sequelize');

const User = sequelize.define('user', {
    id: {
	    type: DataTypes.INTEGER,
        primaryKey: true, 
        autoIncrement: true,
        allowNull: false,
	},
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "Vasya"
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "Pupkin"
    },
})

User.sync()

module.exports = { 
    User 
}