const fs = require('fs');
const db = require('./db.json')

module.exports = {
    saveDb: function () {
        fs.writeFile('./db.json', JSON.stringify(db, null, 4), (err) => {
            if(err) return message.channel.send("Une erreur est survenue lors de la connexion à la base de données !")
        })
    }
}