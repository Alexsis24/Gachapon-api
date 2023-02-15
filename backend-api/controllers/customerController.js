const { request } = require("express")
const {db} = require("../db")
const Customers = db.customers

exports.getAll = async (req, res)=>{
    const customers = await Customers.findAll({attributes:["id","userName","userPass"]})
    res.send(customers)
}
exports.getById = async (req, res)=>{
    const customers = await Customers.findByPk(req.params.userId)
    if (customers === null) {
        res.status(404).send({"error":"Machine not found"})
        return
    }
    res.send(customers)
    //const gachas = await Gachas.findById({where:[id:]})
    //res.send(gachas) delivers
}
exports.createNew = async (req,res) =>{
    let user
    try {
        user = await Users.create(req.body)
    } catch (error) {
        if (error instanceof db.Sequelize.ValidationError)
        {
            res.status(400).send({"error":error.errors.map((item => item.message))})
        } else {
            console.log("GachasCreate: ",error);
            res.status(500).send({"error":"Something went wrong on our side, a crack team of bughunting kittens has been dispatched :3"})
        }
        return
    }
    res.status(201).location(`${getBaseUrl(req)}/gachas/${user.id}`).json(user)
}

exports.deleteById = async (req, res) => {
    let result 
    try {
        result = await Users.destroy({ where: { id: req.params.userId } })
    } catch (error) {
        console.log("GachasDelete: ",error)
        res.status(500).send({"error":"Something went wrong on our side, a crack team of bughunting kittens has been dispatched :3"})
        return
    }    
    if (result===0) {
        res.status(404).send({"error":"Machine not found"})
        return
    }
    res.status(204).send()
}

exports.updateById = async (req, res) => {
    let result 
    delete req.body.id
    try {
        result = await Users.update(req.body,{ where: { id: req.params.userId } })
    } catch (error) {
        console.log("GachasUpdate: ",error)
        res.status(500).send({"error":"Something went wrong on our side, a crack team of bughunting kittens has been dispatched :3"})
        return
    }    
    if (result===0) {
        res.status(404).send({"error":"Machine not found"})
        return
    }
    const user = await Gachas.findByPk(req.params.userId)
    res.status(200).location(`${getBaseUrl(req)}/gachas/${gacha.id}`).json(gacha)
}

getBaseUrl = (request) => {
    return ((request.connection &&request.connection.encrypted ? "https":"http") + `://${request.headers.host}`)
}