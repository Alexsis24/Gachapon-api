module.exports = (sequelize, Sequelize, Item, Gacha) =>{
    const RarityList = sequelize.define("RarityList", {
        id : {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        RarityValue : {
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
        }
    })
    
    Gacha.belongsToMany(Gacha, { through: RarityList })
    Gacha.hasMany(RarityList)
    RarityList.belongsTo(Gacha)
    return RarityList
}