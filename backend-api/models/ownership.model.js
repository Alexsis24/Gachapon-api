module.exports = (sequelize, Sequelize, item, user) =>{
    const Ownership = sequelize.define("Ownership", {
        id : {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },

        OwnershipUserId : {
            type: Sequelize.INTEGER,
            references:{
                model: user,
                key: "id",
            },
        },

        OwnershipItemId : {
            type: Sequelize.INTEGER,
            references:{
                model: item,
                key: "id",
            },
        },
        
        Amount :{
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0
        },        
    })
    item.belongsToMany(user, { through: Ownership })
    user.belongsToMany(item, { through: Ownership })
    item.hasMany(Ownership)
    Ownership.belongsTo(item)
    user.hasMany(Ownership)
    Ownership.belongsTo(user)
    return Ownership
}