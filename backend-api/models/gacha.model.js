module.exports = (sequelize,Sequelize) => {
    const Gacha = sequelize.define('Gacha',{
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        item1Rarity: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        item2Rarity: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        item3Rarity: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        item4Rarity: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        item5Rarity: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        item6Rarity: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        item7Rarity: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        item8Rarity: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        item9Rarity: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        item10Rarity: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        gachaAmount: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    })
    return Gacha
}