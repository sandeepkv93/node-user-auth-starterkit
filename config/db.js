require('dotenv').config();
const mongoose = require('mongoose');

const connectToDB = () => {
    return new Promise((resolve, reject) => {
        if (process.env.NODE_ENV === 'test') {
            console.log('Connecting to a mock db for testing purposes.');
            const { MongoMemoryServer } = require('mongodb-memory-server');

            const mongoServer = new MongoMemoryServer();
            mongoServer.getUri()
                .then((mongoUri) => {
                    mongoose.connect(mongoUri, {
                        useNewUrlParser: true,
                        useCreateIndex: true,
                        useUnifiedTopology: true
                    });

                    mongoose.connection.on('error', (e) => {
                        reject(e);
                    });

                    mongoose.connection.once('open', () => {
                        console.log(`MongoDB successfully connected to ${mongoUri}`);
                        resolve();
                    });
                });
        } else {
            const mongoUri = process.env.DATABASE_URL.replace(
                '<password>',
                process.env.DATABASE_PASSWORD
            );
            mongoose.connect(mongoUri,
                {
                    useNewUrlParser: true,
                    useCreateIndex: true,
                    useUnifiedTopology: true
                });

            mongoose.connection.on('error', (e) => {
                reject(e);
            });

            mongoose.connection.once('open', () => {
                console.log('Connected to CosmosDB via Mongoose');
                resolve();
            });
        }
    });
};

const disconnectFromDB = () => {
    return mongoose.disconnect();
}

module.exports = {
    connectToDB,
    disconnectFromDB
};
