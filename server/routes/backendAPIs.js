const express = require('express');
const router = express.Router();
const dbConnect = require('../database');

let userCol = require("../models/col");
let cardModel = require("../models/card")

//ask diff db/collections
//ask insert


//delete table on startup for testing
userCol.deleteMany({}, function(err,removed) {
});

//make function to switch collection

router.get("/allCols", async (req,res) =>{
    try {
      const cols = await userCol.find();
      res.json(cols)
    } catch (err){
      res.json({message: err})
    }
  });

router.post("/createCol", (req,res) =>{
    new userCol({title: req.body.newColName}).save()
    res.json({"temp": "temp"})
});


router.delete("/deleteCol", async (req,res) =>{
    userCol.deleteMany({title: req.body.colName}, function(err,removed) {
    res.json({"temp": "temp"})
    })
});

router.post("/modifyColTitle", async (req,res) =>{
    userCol.findOneAndUpdate({title: req.body.colName}, {title: req.body.newColName}, function(err,removed) {
    res.json({"temp": "temp"})
    })
});


router.post("/createCard", (req,res) =>{

    insertPost = parseInt(req.body.cardPos)
    let tempCard = new cardModel({
        title: req.body.newCardName,
        description: req.body.newCardDesc,
        date: req.body.newCardDeadline,
        comment: req.body.newCardComment,
        colour: req.body.newCardColour
        })


    userCol.findOneAndUpdate(
        {title: req.body.colName},
        {
            $push: {
                cards: {
                    $each: [tempCard],
                $position: insertPost
            }   }
        },
        function(err, doc) {
            if(err){
            console.log(err);
            }else{
            //do stuff
            res.json({ "temp": "temp"})
            }
        }
     )
});

router.delete("/deleteCard", (req,res) =>{
    userCol.findOneAndUpdate(
        { title: req.body.colName},
        { $pull: {cards: 
                {
                    "title": req.body.cardName
                }
            }
        },     
        function(err, doc) {
        if(err){
        console.log(err);
        }else{
        //do stuff
        res.json({ "temp": "temp"})
        }
    })
});


router.post("/modifyCardTitle", async (req,res) =>{
    userCol.collection.updateOne(
        { title: req.body.colName,"cards.title": req.body.cardName },
            {
                 $set: { "cards.$.title" : req.body.newCardName } 
                }
            )
    res.json({message: err})
    
});

router.post("/modifyCardDescription", async (req,res) =>{
    userCol.collection.updateOne(
        { title: req.body.colName,"cards.title": req.body.cardName },
            {
                 $set: { "cards.$.description" : req.body.newCardDescription } 
                }
            )
    res.json({message: err})
    
});

router.post("/modifyCardDate", async (req,res) =>{
    userCol.collection.updateOne(
        { title: req.body.colName,"cards.title": req.body.cardName },
            {
                 $set: { "cards.$.date" : req.body.newCardDate } 
                }
            )
    res.json({message: err})
    
});

router.post("/modifyCardComment", async (req,res) =>{
    userCol.collection.updateOne(
        { title: req.body.colName,"cards.title": req.body.cardName },
            {
                 $set: { "cards.$.comment" : req.body.newCardComment } 
                }
            )
    res.json({message: err})
    
});

router.post("/modifyCardColour", async (req,res) =>{
    userCol.collection.updateOne(
        { title: req.body.colName,"cards.title": req.body.cardName },
            {
                 $set: { "cards.$.colour" : req.body.newCardColour } 
                }
            )
    res.json({message: err})
    
});


router.post("/initialUserCol", (req,res) =>{

    new userCol({title: "completed", cards : []}).save();
    new userCol({title: "in progress", cards : []}).save();
    res.json({"temp": "temp"})


});
    


module.exports = router;