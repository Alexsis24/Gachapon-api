const gachaController = require("../controllers/gachaController.js")

module.exports = (app) => {
    app.route("/gachas")
        .get(gachaController.getAll)
        .post(gachaController.createNew) //Create
        app.route("/gachas/:gachasId")
        .get(gachaController.getById) //Read
        .put(gachaController.updateById) //Update
        .delete(gachaController.deleteById) //Delete 
    }