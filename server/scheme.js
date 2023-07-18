const mongoose = require('mongoose');
const { Schema, Types: { ObjectId } } = mongoose;

const blockAreaSchema = new Schema({
    coordinates: {
        type: Schema.Types.Mixed,
        required: true,
    },
    fontSize: {
        type: Number,
        required: true,
    },
    vertical: {
        type: Boolean,
        required: true,
    },
    segment: {
        type: Boolean,
        required: true,
    },
    panel_id: {
        type: ObjectId,
        ref: 'Panel',
        required: true,
    },
});

const BlockArea = mongoose.model('BlockArea', blockAreaSchema);

const chapterSchema = new Schema({
    number: {
        type: Number,
        required: true,
    },
    series_id: {
        type: ObjectId,
        ref: 'Series',
        required: true,
    },
});

const Chapter = mongoose.model('Chapter', chapterSchema);

const characterSchema = new Schema({
    full_name: {
        type: String,
        required: true,
    },
    picture_url: {
        type: String,
        required: true,
    },
    color: {
        type: String,
        required: true,
    },
    nickname: {
        type: String,
        required: true,
    },
});

const Character = mongoose.model('Character', characterSchema);

const imageSchema = new Schema({
    file: {
        type: String,
        required: true,
    },
    page_id: {
        type: ObjectId,
        ref: 'Page',
        required: true,
    },
});

const Image = mongoose.model('Image', imageSchema);

const pageSchema = new Schema({
    number: {
        type: Number,
        required: true,
    },
    chapter_id: {
        type: ObjectId,
        ref: 'Chapter',
        required: true,
    },
});

const Page = mongoose.model('Page', pageSchema);

const panelSchema = new Schema({
    coordinates: {
        type: Schema.Types.Mixed,
        required: true,
    },
    vertices: {
        type: Schema.Types.Mixed,
        required: true,
    },
    panel_type: {
        type: String,
        enum: ['Normal', 'Flashback'],
        default: 'Normal',
        required: true,
    },
    page_id: {
        type: ObjectId,
        ref: 'Page',
        required: true,
    },
});

const Panel = mongoose.model('Panel', panelSchema);

const seriesSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
});

const Series = mongoose.model('Series', seriesSchema);

const speechBubbleSchema = new Schema({
    language: {
        type: String,
        required: true,
    },
    block_area_id: {
        type: ObjectId,
        ref: 'BlockArea',
        required: true,
    },
});

const SpeechBubble = mongoose.model('SpeechBubble', speechBubbleSchema);

const transcriptionSchema = new Schema({
    content: {
        type: String,
        required: true,
    },
    reading_order: {
        type: Number,
        required: true,
    },
    transcription_type: {
        type: String,
        enum: ['Normal', 'AttackName', 'ThoughtBubble', 'Narration', 'InnerThoughts', 'Onomatopoeia', 'Description'],
        required: true,
    },
    speech_bubble_id: {
        type: ObjectId,
        ref: 'SpeechBubble',
        required: true,
    },
    character_id: {
        type: ObjectId,
        ref: 'Character',
        required: true,
    },
});

const Transcription = mongoose.model('Transcription', transcriptionSchema);

const wordSchema = new Schema({
    coordinates: {
        type: Schema.Types.Mixed,
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    vertices: {
        type: Schema.Types.Mixed,
        required: true,
    },
    block_area_id: {
        type: ObjectId,
        ref: 'BlockArea',
        required: true,
    },
});

const Word = mongoose.model('Word', wordSchema);

module.exports = {
    BlockArea,
    Chapter,
    Character,
    Image,
    Page,
    Panel,
    Series,
    SpeechBubble,
    Transcription,
    Word
};