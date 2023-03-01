module.exports = (sequelize, Sequelize, Item, Gacha) =>{
    const RarityList = sequelize.define("RarityList", {
        id : {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        Rarity : {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        RarityName : {
            type: Sequelize.STRING,
            allowNull: false
        },
        GachaID : {
            type: Sequelize.INTEGER,
            references:{
                model: Gacha,
                key: "id",
            },
        },
        Item1ID : {
            type: Sequelize.INTEGER,
            references:{
                model: Item,
                key: "id",
            },
        },
        Item2ID : {
            type: Sequelize.INTEGER,
            references:{
                model: Item,
                key: "id",
            },
        },
        Item3ID : {
            type: Sequelize.INTEGER,
            references:{
                model: Item,
                key: "id",
            },
        },
    })
    Item.belongsToMany(Item, { through: RarityList })
    Gacha.belongsToMany(Gacha, { through: RarityList })
    Item.hasMany(RarityList)
    RarityList.belongsTo(Item)
    Gacha.hasMany(RarityList)
    RarityList.belongsTo(Gacha)
    return RarityList
}