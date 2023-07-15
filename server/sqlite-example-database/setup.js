const sequelize = require('../sequelize');

async function reset() {
	console.log('Will rewrite the SQLite example database, adding optionable some dummy data..');
	await sequelize.sync({ force: true });
		const defaultUsers = [
			{ username: 'luffy' },
			{ username: 'zoro' },
			{ username: 'nami' },
			{ username: 'ussop' },
		]
		await sequelize.models.user.bulkCreate(defaultUsers);
		console.log('Creating default users!',defaultUsers);
}

reset();
