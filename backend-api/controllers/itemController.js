const { request } = require("express")
const {db} = require("../db")
const Items = db.items

exports.getAll = async (req, res)=>{
    const items = await Items.findAll({attributes:["id","itemName","itemDescription","itemImageLink","itemSupply","itemRarity"]})
    res.send(items)
}
exports.getAllWhereGachaId = async (req, res)=>{
    const items = await Items.findAll({ where: {itemMachine: req.params.gachaDetailId}, attributes:["id","itemName","itemDescription","itemImageLink","itemSupply","itemRarity"]})
    res.send(items)
}
exports.getById = async (req, res)=>{
    const items = await Items.findByPk(req.params.itemId)
    if (items === null) {
        res.status(404).send({"error":"Item not found"})
        return
    }
    res.send(items)
    //const gachas = await Gachas.findById({where:[id:]})
    //res.send(gachas) delivers
}
exports.createNew = async (req,res) =>{
    let item
    try {
        item = await Items.create(req.body)
        console.log(item)
    } catch (error) {
        if (error instanceof db.Sequelize.ValidationError)
        {
            console.log(item)
            res.status(400).send({"error":error.errors.map((x => x.message))})
        } else {
            console.log("ItemsCreate: ",error);
            res.status(500).send({"error":"Something went wrong on our side, a crack team of bughunting kittens has been dispatched :3"})
        }
        return
    }
    res.status(201).location(`${getBaseUrl(req)}/items/${item.id}`).json(item)
}

exports.deleteById = async (req, res) => {
    let result 
    try {
        result = await Items.destroy({ where: { id: req.params.itemId } })
    } catch (error) {
        console.log("ItemsDelete: ",error)
        res.status(500).send({"error":"Something went wrong on our side, a crack team of bughunting kittens has been dispatched :3"})
        return
    }    
    if (result===0) {
        res.status(404).send({"error":"User not found"})
        return
    }
    res.status(204).send()
}

exports.updateById = async (req, res) => {
    let result 
    delete req.body.id
    console.log(req.body)
    try {
        result = await Items.update(req.body,{ where: { id: req.params.itemId } })
        console.log(result)
    } catch (error) {
        console.log("ItemsDelete: ",error)
        res.status(500).send({"error":"Something went wrong on our side, a crack team of bughunting kittens has been dispatched :3 meow"})
        return
    }    
    if (result===0) {
        res.status(404).send({"error":"User not found"})
        return
    }
    const item = await Items.findByPk(req.params.itemId)
    console.log(item)
    res.status(200).location(`${getBaseUrl(req)}/items/${item.id}`).json(item)
}

getBaseUrl = (request) => {
    return ((request.connection &&request.connection.encrypted ? "https":"http") + `://${request.headers.host}`)
}