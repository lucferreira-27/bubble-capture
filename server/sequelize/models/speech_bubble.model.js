const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('speech_bubble', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        language: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        block_area_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'block_area',
                key: 'id',
            },
            allowNull: false
        },
    });
};