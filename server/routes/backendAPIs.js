const express = require('express');
const router = express.Router();
const dbConnect = require('../database');

let cardModel = require("../models/card")
let colModel = require("../models/col")
let boardModel = require("../models/board")
let userBoardModel = require("../models/usersBoard")


//for testing
router.get("/allData", async (req,res) =>{
    try {
      const UBMS = await userBoardModel.find();
      res.json(UBMS)
    } catch (err){
      res.json({message: err})
    }
});

//for testing
router.get("/deleteData", async (req,res) =>{
    userBoardModel.deleteMany({}, function(err,removed) {})
    res.json({"data": "deleted"})
});

router.post("/userData", async (req,res) =>{
    let userBoard = await userBoardModel.find({username : req.body.username})
})

router.post("/initNewUser", (req,res) =>{


    let compCol = new colModel({title: "completed", cards : []})
    let IPCol = new colModel({title: "in progress", cards : []})

    let firstBoard = new boardModel({title : "My First Board!", cols : [compCol, IPCol]})

    new userBoardModel({username: req.body.username, boards : [firstBoard]} ).save()

    res.json({"temp": "temp"})

});  

router.post("/createBoard", (req,res) =>{

    let tempBoard = new boardModel({title : req.body.newBoardTitle, cols : []})
    userBoardModel.findOneAndUpdate(
        {username: req.body.username},
        {
            $push: {
                boards: 
                    [tempBoard]
               }
        },
        function(err, doc) {
            if(err){
                console.log(err);
                res.status(500)
            }else{
                res.status(201)
                res.json({ "temp": "temp"})
            }
        }
     )
});

router.post("/createCol", (req,res) =>{

    insertPost = parseInt(req.body.colPos)
    let tempCol = new colModel({
        title: req.body.newColName})

    userBoardModel.findOneAndUpdate(
        {username: req.body.username, "boards.title": req.body.boardName},
        {
            $push: {
                "boards.$.cols": {
                    $each: [tempCol],
                $position: insertPost
            }   }
        },
        function(err, doc) {
            if(err){
                console.log(err);
                res.status(500)
            }else{
                res.status(201)
                res.json({ "temp": "temp"})
            }
        }
     )


});


router.delete("/deleteCol", async (req,res) =>{
    userBoardModel.findOneAndUpdate(
        {username: req.body.username, "boards.title": req.body.boardName},
        {
            $pull: {
                "boards.$.cols": {
                    title: "A new column"
            }   }
        },
        function(err, doc) {
            if(err){
                console.log(err);
                res.status(500)
            }else{
                res.status(200)
                res.json({ "temp": "temp"})
            }
        }
     )
});

router.post("/modifyColTitle", async (req,res) =>{

    // This replaces the entire col object

    // userBoardModel.collection.updateOne(
    //     {username: req.body.username, "boards.title": req.body.boardName, "boards.cols.title": req.body.colName},
    //         {
    //              $set: { "boards.$.cols" : { "title": "DDDDDDDDDDD"} } 
    //             }
    //         )

    //https://thecodebarbarian.com/a-nodejs-perspective-on-mongodb-36-array-filters 

    // userBoardModel.update({},
    //     { $set: { 'boards.cols.$[element].title': req.body.colName } },
    //     // `$[element]` is tied to name `element` below
    //     { arrayFilters: [{ 'element.title': 'Bar' }] });


    res.json({"temp": "temp"})

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


    colModel.findOneAndUpdate(
        {username: req.body.username, "boards.title": req.body.boardName, "boards.cols.title" : req.body.colName},
        {
            $push: {
                "boards.cols.$.cards": {
                    $each: [tempCard],
                $position: insertPost
            }   }
        },
        function(err, doc) {
            if(err){
                console.log(err);
                res.status(500)
            }else{
                res.status(201)
                res.json({ "temp": "temp"})
            }
        }
     )
});

router.delete("/deleteCard", (req,res) =>{
    colModel.findOneAndUpdate(
        {username: req.body.username, "boards.title": req.body.boardName, "boards.cols.title" : req.body.colName},
        {
            $pull: {
                "boards.cols.$.cards": {
                    title: "A new column"
            }   }
        },
        function(err, doc) {
            if(err){
                console.log(err);
                res.status(500)
            }else{
                res.status(200)
                res.json({ "temp": "temp"})
            }
        }
     )
});


router.post("/modifyCardTitle", async (req,res) =>{
    colModel.collection.updateOne(
        { title: req.body.colName,"cards.title": req.body.cardName },
            {
                 $set: { "cards.$.title" : req.body.newCardName } 
                },
                function(err, doc) {
                    if(err){
                        console.log(err);
                        res.status(500)
                    }else{
                        res.status(200)
                        res.json({ "temp": "temp"})
                    }
                }
             )
});

router.post("/modifyCardDescription", async (req,res) =>{
    colModel.collection.updateOne(
        { title: req.body.colName,"cards.title": req.body.cardName },
            {
                 $set: { "cards.$.description" : req.body.newCardDescription } 
                },
                function(err, doc) {
                    if(err){
                        console.log(err);
                        res.status(500)
                    }else{
                        res.status(200)
                        res.json({ "temp": "temp"})
                    }
                }
             )
    
});

router.post("/modifyCardDate", async (req,res) =>{
    colModel.collection.updateOne(
        { title: req.body.colName,"cards.title": req.body.cardName },
            {
                 $set: { "cards.$.date" : req.body.newCardDate } 
                },
                function(err, doc) {
                    if(err){
                        console.log(err);
                        res.status(500)
                    }else{
                        res.status(200)
                        res.json({ "temp": "temp"})
                    }
                }
             )
    
});

router.post("/modifyCardComment", async (req,res) =>{
    colModel.collection.updateOne(
        { title: req.body.colName,"cards.title": req.body.cardName },
            {
                 $set: { "cards.$.comment" : req.body.newCardComment } 
                },
                function(err, doc) {
                    if(err){
                        console.log(err);
                        res.status(500)
                    }else{
                        res.status(200)
                        res.json({ "temp": "temp"})
                    }
                }
             )
    
});

router.post("/modifyCardColour", async (req,res) =>{
    colModel.collection.updateOne(
        { title: req.body.colName,"cards.title": req.body.cardName },
            {
                 $set: { "cards.$.colour" : req.body.newCardColour } 
                },
                function(err, doc) {
                    if(err){
                        console.log(err);
                        res.status(500)
                    }else{
                        res.status(200)
                        res.json({ "temp": "temp"})
                    }
                }
             )
});



module.exports = router;