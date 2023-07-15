const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('block_area', {
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
        fontSize: {
            allowNull: false,
            type: DataTypes.INTEGER,
        },
        vertical: {
            allowNull: false,
            type: DataTypes.BOOLEAN,
        },
        segment: {
            allowNull: false,
            type: DataTypes.BOOLEAN,
        },
        panel_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'panel',
                key: 'id',
            },
            allowNull: false
        },
    });
};