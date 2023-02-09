const {db} = require("../db")
const Gachas = db.gachas

exports.getAll = async (req, res)=>{
    const gachas = await Gachas.findAll({attributes:["name"]})
    res.send(gachas)
}
exports.getById = async (req, res)=>{
    const gachas = await Gachas.findByPk(req.params.id)
    if (gachas === null) {
        res.status(404).send({"error":"Gachapon not found"})
        return
    }
    res.send(gachas)
    //const gachas = await Gachas.findById({where:[id:]})
    //res.send(gachas) delivers
}
exports.createNew = async (req,res) =>{
    let gacha
    try {
        gacha = await Gachas.create(req.body)
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
    res.status(201).location(`${getBaseUrl(req)}/gachas/${gacha.id}`).json(gacha)
}

exports.deleteById = async (req, res) => {
    let result 
    try {
        result = await Gachas.destroy({ where: { id: req.params.gachasId } })
    } catch (error) {
        console.log("GachasDelete: ",error)
        res.status(500).send({"error":"Something went wrong on our side, a crack team of bughunting kittens has been dispatched :3"})
        return
    }    
    if (result===0) {
        res.status(404).send({"error":"Gachapon not found"})
        return
    }
    res.status(204).send()
}

getBaseUrl = (request) => {
    return ((request.connection &&request.connection.encrypted ? "https":"http") + `://${request.headers.host}`)
}