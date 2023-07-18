const mongoose = require('mongoose');

const models = require('../scheme');
const fs = require('fs');
const path = require('path');

// Read JSON data from a file
const jsonData = JSON.parse(fs.readFileSync(path.join(__dirname, 'data.json'), 'utf8'));
const DATABASE_NAME = 'bubble-db';

async function insertJsonDataToDatabase(jsonData, seriesTitle, chapterTitle, chapterNumber) {
    console.log('Inserting JSON data into the database');

    let series = await findOrCreateSeries(seriesTitle);
    let chapter = await findOrCreateChapter(chapterNumber, series._id);

    for (let pageData of jsonData.pages) {
        await createPageAndImage(pageData, chapter._id);
    }
}

async function findOrCreateSeries(seriesTitle) {
    console.log('Looking for existing series');

    let series = await models.Series.findOne({ title: seriesTitle });

    if (!series) {
        console.log('Series not found, creating new one');
        series = await models.Series.create({ title: seriesTitle });
    }
    console.log(series)

    return series;
}

async function findOrCreateChapter(chapterNumber, seriesId) {
    console.log('Finding or creating chapter');
    console.log({ number: chapterNumber })
    let chapter = await models.Chapter.findOne({ number: chapterNumber });
    if (!chapter) {
        console.log('Chapter not found, creating chapter');
        chapter = await models.Chapter.create({
            number: chapterNumber,
            series_id: seriesId
        });
    }
    return chapter;
}

async function createPageAndImage(pageData, chapterId) {
    console.log('Creating page and image');
    
    let page = await models.Page.findOne({ number: parseInt(pageData.pageNumber) });
    if (!page) {
        page = await models.Page.create({
            chapter_id: chapterId,
            number: parseInt(pageData.pageNumber)
        });
    }
    
    let image = await models.Image.findOne({ file: pageData.image.file });
    if (!image) {
        await models.Image.create({
            file: pageData.image.file,
            width: pageData.image.width,
            height: pageData.image.height,
            page_id: page._id
        });
    }
}

async function resetDatabase() {
    console.log('Resetting the database');

    await mongoose.connection.dropDatabase();

    for (let i = 0; i < jsonData.length; i++) {
        await insertJsonDataToDatabase(jsonData[i], 'One piece', 'Chapter ' + (i + 1), i + 1);
    }
    console.log('Default data created!');
}

async function connectAndResetDatabase(uri) {
    try {
        console.log('Connecting to MongoDB');
        await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        await resetDatabase();
        console.log('Data inserted successfully!');
    } catch (error) {
        console.error('Error inserting data:', error);
    } finally {
        mongoose.connection.close();
    }
}

async function startDatabase() {
    console.log('Starting the database');

    const uri = `mongodb://127.0.0.1:27017/${DATABASE_NAME}`;
    return uri;
}

startDatabase().then(uri => {
    connectAndResetDatabase(uri);
}).catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});