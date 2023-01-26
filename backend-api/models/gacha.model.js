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
        }
    })
    return Gacha
}