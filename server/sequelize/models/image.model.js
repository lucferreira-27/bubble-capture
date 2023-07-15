const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('image', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        url: {
            allowNull: false,
            type: DataTypes.STRING, // You can use DataTypes.TEXT for longer URLs
        },
        page_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'page',
                key: 'id',
            },
            allowNull: false
        },
    });
};