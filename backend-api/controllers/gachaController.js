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
    const gachas = await Gachas.create(req.body)
    res.send(gachas)
}