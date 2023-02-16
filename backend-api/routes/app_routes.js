const gachaController = require("../controllers/gachaController.js")
const customerController = require("../controllers/userController.js")

module.exports = (app) => {
    app.route("/gachas")
        .get(gachaController.getAll)
        .post(gachaController.createNew) //Create
        app.route("/gachas/:gachasId")
        .get(gachaController.getById) //Read
        .put(gachaController.updateById) //Update
        .delete(gachaController.deleteById) //Delete 
        
    app.route("/users")
    .get(customerController.getAll)
    .post(customerController.createNew) //Create
    app.route("/users/:userId")
    .get(customerController.getById) //Read
    .put(customerController.updateById) //Update
    .delete(customerController.deleteById) //Delete 
    }