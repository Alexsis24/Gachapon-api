module.exports = (sequelize,Sequelize) => {
    const Customer = sequelize.define('Customer',{
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
    return Customer
}