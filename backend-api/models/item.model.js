module.exports = (sequelize,Sequelize,RarityList) => {
    const Item = sequelize.define('Item',{
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        ItemName: {
            type: Sequelize.STRING,
            allowNull: false
        },
        ItemDescription: {
            type: Sequelize.STRING,
            allowNull: false
        },
        ItemImageLink: {
            type: Sequelize.STRING,
            allowNull: false
        },
        ItemSupply: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        ItemRarity:{
            type: Sequelize.INTEGER,
            references:{
                model: RarityList,
                key: "id",
            }
        }
    })
    RarityList.belongsToMany(RarityList, { through: Item })
    RarityList.hasMany(Item)
    Item.belongsTo(RarityList)
    return Item
}