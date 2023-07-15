function applyExtraSetup(sequelize) {
    const { series, chapter, page, image, panel, block_area, speech_bubble, character, transcription, word } = sequelize.models;
    // A series has many chapters
    series.hasMany(chapter, { foreignKey: 'series_id' });
    chapter.belongsTo(series, { foreignKey: 'series_id' });

    // A chapter has many pages
    chapter.hasMany(page, { foreignKey: 'chapter_id' });
    page.belongsTo(chapter, { foreignKey: 'chapter_id' });

    // A page belongs to an image
    page.belongsTo(image, { foreignKey: 'image_id' });
    image.hasOne(page, { foreignKey: 'image_id' });

    // A page has many panels
    page.hasMany(panel, { foreignKey: 'page_id' });
    panel.belongsTo(page, { foreignKey: 'page_id' });

    // A panel has many block areas
    panel.hasMany(block_area, { foreignKey: 'panel_id' });
    block_area.belongsTo(panel, { foreignKey: 'panel_id' });

    // A block area has many speech bubbles and words
    block_area.hasMany(speech_bubble, { foreignKey: 'block_area_id' });
    speech_bubble.belongsTo(block_area, { foreignKey: 'block_area_id' });

    block_area.hasMany(word, { foreignKey: 'block_area_id' });
    word.belongsTo(block_area, { foreignKey: 'block_area_id' });

    // A speech bubble has many transcriptions
    speech_bubble.hasMany(transcription, { foreignKey: 'speech_bubble_id' });
    transcription.belongsTo(speech_bubble, { foreignKey: 'speech_bubble_id' });

    // A transcription belongs to a character
    transcription.belongsTo(character, { foreignKey: 'character_id' });
    character.hasMany(transcription, { foreignKey: 'character_id' });
}

module.exports = { applyExtraSetup };