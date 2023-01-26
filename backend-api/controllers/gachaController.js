const {db} = require("../db")
const Gacha = db.gachas

exports.getAll = async (req, res)=>{
    const gachas = await Gacha.findAll({attributes:["name"]})
    res.send(gachas)
}