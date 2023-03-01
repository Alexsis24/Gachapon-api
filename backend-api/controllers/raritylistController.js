const { request } = require("express")
const {db} = require("../db")
const RarityLists = db.raritylists
const Gacha = db.gachas
const Item = db.items

exports.getAll = async (req, res)=>{
    const raritylists = await RarityLists.findAll({attributes:["id","Rarity","RarityName","GachaId","Item1ID","Item2ID","Item3ID"]})
    res.send(raritylists)
}
exports.getById = async (req, res)=>{
    const RarityList = await RarityLists.findByPk(req.params.raritylistId)
    if (RarityList === null) {
        res.status(404).send({"error":"RarityList not found"})
        return
    }
    res.send(RarityList)
    
}
exports.createNew = async (req,res) =>{
    console.log("New RarityList: ",req.body)
    let raritylists
    try {
        raritylists = await RarityLists.create(req.body,
            {
                logging: console.log,
                include: [ Item, Gacha ]
            })    
        } catch (error) {
            if (error instanceof db.Sequelize.ValidationError)
            {
                console.log(raritylists)
                res.status(400).send({"error":error.errors.map((x => x.message))})
            } else if (error instanceof db.Sequelize.ForeignKeyConstraintError){
                res.status(400).send({"error":`Table:${error.table} does not contain row with id:${error.value}`})
            } else {
                console.log("RarityListsCreate: ",error);
                res.status(500).send({"error":"Something went wrong on our side, a crack team of bughunting kittens has been dispatched :3"})
            }
            return
    }
    res.status(201).location(`${getBaseUrl(req)}/raritylists/${RarityLists.id}`).json(raritylists)
}

exports.deleteById = async (req, res) => {
    let result 
    try {
        result = await RarityLists.destroy({ where: { id: req.params.raritylistId } })
    } catch (error) {
        console.log("RarityListsDelete: ",error)
        res.status(500).send({"error":"Something went wrong on our side, a crack team of bughunting kittens has been dispatched :3"})
        return
    }    
    if (result === null) {
        res.status(404).send({"error":"RarityList not found"})
        return
    }
    res.status(204).send()
}

exports.updateById = async (req, res) => {
    let result 
    delete req.body.id
    console.log(req.body)
    try {
        result = await RarityLists.update(req.body,{ where: { id: req.params.raritylistId } })
        console.log(result)
    } catch (error) {
        console.log("RarityListsDelete: ",error)
        res.status(500).send({"error":"Something went wrong on our side, a crack team of bughunting kittens has been dispatched :3 meow"})
        return
    }    
    if (result===0) {
        res.status(404).send({"error":"RarityList not found"})
        return
    }
    const RarityList = await RarityLists.findByPk(req.params.raritylistId)
    console.log(RarityList)
    res.status(200).location(`${getBaseUrl(req)}/raritylists/${RarityLists.id}`).json(RarityList)
}

getBaseUrl = (request) => {
    return ((request.connection &&request.connection.encrypted ? "https":"http") + `://${request.headers.host}`)
}


// the rarity list endpoint cannot be properly checked with the current apicurio setup, the table was altered in the database, the current tests might not work.
// there are more sequelize name errors, it is too late to fix them, am tired. 