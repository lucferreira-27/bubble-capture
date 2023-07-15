const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('word', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        coordinates: {
            allowNull: false,
            type: DataTypes.JSONB,
        },
        text: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        vertices: {
            allowNull: false,
            type: DataTypes.JSONB,
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