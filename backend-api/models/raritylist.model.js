module.exports = (sequelize,Sequelize) => {
    const User = sequelize.define('User',{
        ListId: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        Rarity: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        UserName: {
            type: Sequelize.STRING,
            allowNull: false
            references: {
                model: Model,
                key: "id"
            }
        },
        UserPass: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    })
    return User
}