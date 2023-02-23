const gachaController = require("../controllers/gachaController.js")
const userController = require("../controllers/userController.js")
const itemController = require("../controllers/itemController.js")

module.exports = (app) => {
    app.route("/gachas")
        .get(gachaController.getAll)
        .post(gachaController.createNew) //Create
    app.route("/gachas/:gachasId")
        .get(gachaController.getById) //Read
        .put(gachaController.updateById) //Update
        .delete(gachaController.deleteById) //Delete 
    ////////////////////////////////
    app.route("/users")
        .get(userController.getAll)
        .post(userController.createNew) //Create
    app.route("/users/:userId")
        .get(userController.getById) //Read
        .put(userController.updateById) //Update
        .delete(userController.deleteById) //Delete 
    ////////////////////////////////
    app.route("/items")
        .get(itemController.getAll)
        .post(itemController.createNew) //Create
    app.route("/items/:itemId")
        .get(itemController.getById) //Read
        .put(itemController.updateById) //Update
        .delete(itemController.deleteById) //Delete 
    ////////////////////////////////
    app.route("/ownerships")
        .get(ownershipsController.getAll)
        .post(ownershipsController.createNew) //Create
    app.route("/ownerships/:ownershipId")
        .get(ownershipsController.getById) //Read
        .put(ownershipsController.updateById) //Update
        .delete(ownershipsController.deleteById) //Delete

}