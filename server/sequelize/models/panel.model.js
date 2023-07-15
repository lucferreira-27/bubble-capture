const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('panel', {
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
        vertices: {
            allowNull: false,
            type: DataTypes.JSONB,
        },
        panel_type: {
            allowNull: false,
            type: DataTypes.ENUM('Normal', 'Flashback'),
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