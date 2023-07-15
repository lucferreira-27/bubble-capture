const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('transcription', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        content: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        reading_order: {
            allowNull: false,
            type: DataTypes.INTEGER,
        },
        transcription_type: {
            allowNull: false,
            type: DataTypes.ENUM('Normal', 'AttackName', 'ThoughtBubble', 'Narration', 'InnerThoughts', 'Onomatopoeia', 'Description'),
        },
        speech_bubble_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'speech_bubble',
                key: 'id',
            },
            allowNull: false
        },
        character_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'character',
                key: 'id',
            },
            allowNull: false
        },
    });
};