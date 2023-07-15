const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('chapter', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        number: {
            allowNull: false,
            type: DataTypes.INTEGER,
        },
        series_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'series', // name of the model
                key: 'id',
            },
            allowNull: false
        },
    });
};