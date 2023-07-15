const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('character', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        full_name: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        picture_url: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        color: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        nickname: {
            allowNull: false,
            type: DataTypes.STRING,
        },
    });
};