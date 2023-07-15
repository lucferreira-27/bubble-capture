const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('page', {
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
        chapter_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'chapter', // name of the model
                key: 'id',
            },
            allowNull: false
        },
    });
};