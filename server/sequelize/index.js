const { Sequelize } = require('sequelize');
const { applyExtraSetup } = require('./extra-setup');


// const sequelize = new Sequelize(process.env.DB_CONNECTION_URL);
const sequelize = new Sequelize({
	dialect: 'sqlite',
	storage: 'sqlite-example-database/example-db.sqlite',
	logQueryParameters: true,
	benchmark: true
});

const modelDefiners = [
	require('./models/user.model'),
	require('./models/series.model'),
	require('./models/chapter.model'),
	require('./models/page.model'),
	require('./models/image.model'),
	require('./models/panel.model'),
	require('./models/block_area.model'),
	require('./models/speech_bubble.model'),
	require('./models/character.model'),
	require('./models/transcription.model'),
	require('./models/word.model')
];

// We define all models according to their files.
for (const modelDefiner of modelDefiners) {
	modelDefiner(sequelize);
}

// We execute any extra setup after the models are defined, such as adding associations.
applyExtraSetup(sequelize);

// We export the sequelize connection instance to be used around our app.
module.exports = sequelize;
