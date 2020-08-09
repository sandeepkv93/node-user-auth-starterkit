require('dotenv').config();
const mongoose = require('mongoose');

const EstablishMongoConnection = async () => {
    try {
        const mongoURI = process.env.DATABASE_URL.replace(
            '<password>',
            process.env.DATABASE_PASSWORD
        );
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        console.log("Connected to CosmosDB via Mongoose");
    } catch (error) {
        console.error(error);
    }
}

module.exports = {
    EstablishMongoConnection: EstablishMongoConnection
};
