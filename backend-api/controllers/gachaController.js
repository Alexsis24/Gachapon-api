const {db} = require("../db")
const Gachas = db.gachas

exports.getAll = async (req, res)=>{
    const gachas = await Gachas.findAll({attributes:["name"]})
    res.send(gachas)
}
exports.getById = async (req, res)=>{
    const gachas = await Gachas.findByPk(req.params.id)
    if (gachas === null) {
        res.status(404).send({"error":"gachapon not found"})
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

getBaseUrl = (request) => {
    return (request?.connection?.encrypted ? "https":"http") + `://${request.headers.host}`
}