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
        gachaAmount: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        description: {
            type: Sequelize.STRING,
            allowNull: true
        }
    })
    return Gacha;
}