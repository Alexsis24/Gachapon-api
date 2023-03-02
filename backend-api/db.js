const Sequelize = require('sequelize');
const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
        host: process.env.DB_HOST,
        dialect: "mariadb",
        define: {
            timestamps: false
        },
        logging: false
    }
)

const db = {}
db.Sequelize = Sequelize
db.sequelize = sequelize

db.gachas = require("./models/gacha.model.js")(sequelize,Sequelize)
db.users = require("./models/user.model.js")(sequelize,Sequelize)
db.items = require("./models/item.model.js")(sequelize,Sequelize)
db.ownerships = require("./models/ownership.model.js")(sequelize,Sequelize, db.users, db.items)
db.raritylists = require("./models/raritylist.model.js")(sequelize,Sequelize, db.gachas, db.items)

async function Sync(){
    await sequelize.sync({alter:true}) //alter existing table
    //                  {force:true} //erase and recreate
}

module.exports = {db, Sync}