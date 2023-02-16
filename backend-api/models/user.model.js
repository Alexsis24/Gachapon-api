module.exports = (sequelize,Sequelize) => {
    const User = sequelize.define('User',{
        UserId: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        UserName: {
            type: Sequelize.STRING,
            allowNull: false
        },
        UserPass: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    })
    return User
}