const {db} = require("../db")
const Gachas = db.gachas

exports.getAll = async (req, res)=>{
    const gachas = await Gachas.findAll({attributes:["name"]})
    res.send(gachas)
}
exports.getById = async (req, res)=>{
    const gachas = await Gachas.findByPk({where: {id: req.params.id}})
    res.send(gachas)
    //const gachas = await Gachas.findById({where:[id:]})
    //res.send(gachas)
}