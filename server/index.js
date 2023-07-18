const app = require('./express/app');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

const PORT = 8080;
const DATABASE_NAME = 'bubble-db';

let mongod;

async function establishDatabaseConnection() {
    console.log(`Attempting database connection...`);

    const mongod = await MongoMemoryServer.create({
        instance: {
          dbName: DATABASE_NAME,
          reuse: true,
          dbPath: './database', // custom data directory 
          persist: true
        }
      });

    const uri = `mongodb://127.0.0.1:27017/${DATABASE_NAME}`;

    try {
        await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Database connection successful!');
    } catch (error) {
        console.log('Unable to connect to the database:');
        console.log(error.message);
        process.exit(1);
    }
}

async function closeDbConnection() {
    await mongoose.disconnect();
    await mongod.stop();
}

async function init() {
    console.log(`Starting Mongoose`);
    await establishDatabaseConnection();


    app.listen(PORT, () => {
        console.log(`Express server started on port ${PORT}. Try some routes, such as '/api/users'.`);
    });
}

// Close connection on exit
process.on('exit', closeDbConnection);

init();