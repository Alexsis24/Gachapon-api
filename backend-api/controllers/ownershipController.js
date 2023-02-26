const { request } = require("express")
const {db} = require("../db")
const Ownership = db.ownerships
const user = db.users
const item = db.items

exports.getAll = async (req, res)=>{
    const ownerships = await Ownership.findAll({attributes:["id","OwnershipUserId","OwnershipItemId","Amount"]})
    res.send(ownerships)
}
exports.getById = async (req, res)=>{
    const ownerships = await Ownership.findByPk(req.params.id)
    if (ownerships === null) {
        res.status(404).send({"error":"Ownership not found"})
        return
    }
    res.send(ownerships)
    //const gachas = await Gachas.findById({where:[id:]})
    //res.send(gachas) delivers
}
exports.createNew = async (req,res) =>{
    console.log("New Ownership: ",req.body)
    let ownership
    try {
        ownership = await Ownership.create(req.body,
            {
                logging: console.log,
                include: [ item, user ]
            })    
        } catch (error) {
            if (error instanceof db.Sequelize.ValidationError)
            {
                console.log(ownership)
                res.status(400).send({"error":error.errors.map((x => x.message))})
            } else if (error instanceof db.Sequelize.ForeignKeyConstraintError){
                res.status(400).send({"error":`Table:${error.table} does not contain row with id:${error.value}`})
            } else {
                console.log("OwnershipsCreate: ",error);
                res.status(500).send({"error":"Something went wrong on our side, a crack team of bughunting kittens has been dispatched :3"})
            }
            return
    }
    res.status(201).location(`${getBaseUrl(req)}/ownerships/${ownership.id}`).json(ownership)
}

exports.deleteById = async (req, res) => {
    let result 
    try {
        result = await Ownership.destroy({ where: { id: req.params.id } })
    } catch (error) {
        console.log("OwnershipsDelete: ",error)
        res.status(500).send({"error":"Something went wrong on our side, a crack team of bughunting kittens has been dispatched :3"})
        return
    }    
    if (result === null) {
        res.status(404).send({"error":"Ownership not found"})
        return
    }
    res.status(204).send()
}

exports.updateById = async (req, res) => {
    let result 
    delete req.body.id
    console.log(req.body)
    try {
        result = await Ownership.update(req.body,{ where: { id: req.params.id } })
        console.log(result)
    } catch (error) {
        console.log("OwnershipsDelete: ",error)
        res.status(500).send({"error":"Something went wrong on our side, a crack team of bughunting kittens has been dispatched :3 meow"})
        return
    }    
    if (result===0) {
        res.status(404).send({"error":"Ownership not found"})
        return
    }
    const ownership = await Ownership.findByPk(req.params.id)
    console.log(ownership)
    res.status(200).location(`${getBaseUrl(req)}/ownerships/${Ownership.id}`).json(ownership)
}

getBaseUrl = (request) => {
    return ((request.connection &&request.connection.encrypted ? "https":"http") + `://${request.headers.host}`)
}