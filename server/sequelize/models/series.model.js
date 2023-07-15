const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('series', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        title: {
            allowNull: false,
            type: DataTypes.STRING,
        },
    });
};