module.exports = (sequelize, Sequelize, Item, Gacha) =>{
    const Reward = sequelize.define("Reward", {
        id : {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        GachaId : {
            type: Sequelize.INTEGER,
            references:{
                model: Gacha,
                key: "id",
            },
        },
        ItemId : {
            type: Sequelize.INTEGER,
            references:{
                model: Item,
                key: "id",
            },
        },        
        Amount :{
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0
        },        
    })
    Item.belongsToMany(Gacha, { through: Reward })
    Gacha.belongsToMany(Item, { through: Reward })
    Item.hasMany(Reward)
    Reward.belongsTo(Item)
    Gacha.hasMany(Reward)
    Reward.belongsTo(Gacha)
    return Reward
}