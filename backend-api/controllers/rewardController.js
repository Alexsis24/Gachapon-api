const { request } = require("express")
const {db} = require("../db")
const Rewards = db.rewards
const Gacha = db.gachas
const Item = db.items

exports.getAll = async (req, res)=>{
    const rewards = await Rewards.findAll({attributes:["id","GachaId","ItemId","Amount"]})
    res.send(rewards)
}
exports.getById = async (req, res)=>{
    const Reward = await Rewards.findByPk(req.params.rewardId)
    if (Reward === null) {
        res.status(404).send({"error":"Item-to-machine association not found"})
        return
    }
    res.send(Reward)
    
}
exports.createNew = async (req,res) =>{
    console.log("New Reward: ",req.body)
    let rewards
    try {
        rewards = await Rewards.create(req.body,
            {
                logging: console.log,
                include: [ Item, Gacha ]
            })    
        } catch (error) {
            if (error instanceof db.Sequelize.ValidationError)
            {
                console.log(rewards)
                res.status(400).send({"error":error.errors.map((x => x.message))})
            } else if (error instanceof db.Sequelize.ForeignKeyConstraintError){
                res.status(400).send({"error":`Table:${error.table} does not contain row with id:${error.value}`})
            } else {
                console.log("RewardsCreate: ",error);
                res.status(500).send({"error":"Something went wrong on our side, a crack team of bughunting kittens has been dispatched :3"})
            }
            return
    }
    res.status(201).location(`${getBaseUrl(req)}/rewards/${Rewards.id}`).json(rewards)
}

exports.deleteById = async (req, res) => {
    let result 
    try {
        result = await Rewards.destroy({ where: { id: req.params.rewardId } })
    } catch (error) {
        console.log("RewardsDelete: ",error)
        res.status(500).send({"error":"Something went wrong on our side, a crack team of bughunting kittens has been dispatched :3"})
        return
    }    
    if (result === null) {
        res.status(404).send({"error":"Reward-to-gacha association not found"})
        return
    }
    res.status(204).send()
}

exports.updateById = async (req, res) => {
    let result 
    delete req.body.id
    console.log(req.body)
    try {
        result = await Rewards.update(req.body,{ where: { id: req.params.rewardId } })
        console.log(result)
    } catch (error) {
        console.log("RewardsDelete: ",error)
        res.status(500).send({"error":"Something went wrong on our side, a crack team of bughunting kittens has been dispatched :3 meow"})
        return
    }    
    if (result===0) {
        res.status(404).send({"error":"Reward-to-Gacha not found"})
        return
    }
    const Reward = await Rewards.findByPk(req.params.rewardId)
    console.log(Reward)
    res.status(200).location(`${getBaseUrl(req)}/rewards/${Rewards.id}`).json(Reward)
}

getBaseUrl = (request) => {
    return ((request.connection &&request.connection.encrypted ? "https":"http") + `://${request.headers.host}`)
}