module.exports = (sequelize, Sequelize, Item, User) =>{
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
                model: User,
                key: "id",
            },
        },

        OwnershipItemId : {
            type: Sequelize.INTEGER,
            references:{
                model: Item,
                key: "id",
            },
        },
        
        Amount :{
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0
        },        
    })
    Item.belongsToMany(User, { through: Ownership })
    User.belongsToMany(Item, { through: Ownership })
    Item.hasMany(Ownership)
    Ownership.belongsTo(Item)
    User.hasMany(Ownership)
    Ownership.belongsTo(User)
    return Ownership
}