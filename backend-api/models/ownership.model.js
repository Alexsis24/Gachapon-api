module.exports = (sequelize, Sequelize, Items, Users) =>{
    const Ownership = sequelize.define("ownership", {
        id : {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        OwnershipUserId : {
            type: Sequelize.INTEGER,
            references:{
                model: Users,
                key: "id",
            },
        },
        OwnershipItemId : {
            type: Sequelize.INTEGER,
            references:{
                model: Items,
                key: "id",
            },
        },
        Amount :{
            type: Sequelize.INTEGER,
            allowNull: false
        },        
    })

    Items.belongsToMany(Users, { through: Ownership })
    Users.belongsToMany(Items, { through: Ownership })
    return Ownership
}