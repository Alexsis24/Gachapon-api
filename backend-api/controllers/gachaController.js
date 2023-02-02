const {db} = require("../db")
const Gachas = db.gachas

exports.getAll = async (req, res)=>{
    const gachas = await Gachas.findAll({attributes:["name"]})
    res.send(gachas)
}
exports.getById = async (req, res)=>{
    console.log(req.params)
    res.send(req.params)
    //const gachas = await Gachas.findById({where:[id:]})
    //res.send(gachas)
}