module.exports = (sequelize,Sequelize) => {
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
        ItemRarity: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    })
    return Item
}