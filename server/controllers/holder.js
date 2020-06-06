const Holder = require("../models/holder");
const { check, validationResult } = require("express-validator");
const ObjectId = require('mongoose').Types.ObjectId;

exports.addHolder = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            error: errors.array()[0].msg
        });
    }
    req.body.user = req.auth._id
    const holder = new Holder(req.body)
    console.log(holder)
    holder.save(async (err, holder) => {
        if (err) {
            console.log(err)
            return res.status(400).json({
                err: "NOT able to save user in DB"
            });
        }
        return res.json({message:"successfully saved the holder"});
    })
}

exports.getHolder = (req, res) => {
    Holder.find({user:ObjectId(req.auth._id)}).then((response)=>{
        console.log(response)
        return res.status(200).json({
            holder: response
        })
    })
}


exports.deleteHolder = (req, res)=> {
    console.log(req.params)
    Holder.deleteOne({_id:ObjectId(req.params.id)}).then((response)=>{
        return res.status(200).json({
            message:"Successfully deleted"
        })
    })
}