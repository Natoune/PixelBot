const mongoose = require('mongoose');
const { DBCONNECTION } = require('../config');

module.exports = {
    init: () => {
        const mongOptions = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            autoIndex: false,
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
            family: 4,
        }

        mongoose.connect(DBCONNECTION, mongOptions);
        mongoose.Promise = global.Promise;
        mongoose.connection.on("connected", () => console.log("Base de Données connectée !"));
    }
}