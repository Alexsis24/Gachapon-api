const gachaController = require("../controllers/gachaController.js")
const userController = require("../controllers/userController.js")

module.exports = (app) => {
    app.route("/gachas")
        .get(gachaController.getAll)
        .post(gachaController.createNew) //Create
        app.route("/gachas/:gachasId")
        .get(gachaController.getById) //Read
        .put(gachaController.updateById) //Update
        .delete(gachaController.deleteById) //Delete 
        
    app.route("/users")
    .get(userController.getAll)
    .post(userController.createNew) //Create
    app.route("/users/:userId")
    .get(userController.getById) //Read
    .put(userController.updateById) //Update
    .delete(userController.deleteById) //Delete 
    }