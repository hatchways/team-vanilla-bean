const express = require('express');
const router = express.Router();
const dbConnect = require('../database');

let userBoard = require("../models/board");
let cardModel = require("../models/card")


//delete table on startup for testing
userBoard.deleteMany({}, function(err,removed) {
});

//make function to switch collection

router.get("/allBoards", async (req,res) =>{
    try {
      const boards = await userBoard.find();
      res.json(boards)
    } catch (err){
      res.json({message: err})
    }
  });

router.post("/createBoard", (req,res) =>{
    new userBoard({title: req.body.newBoardName}).save()
    res.json({"temp": "temp"})
});


router.delete("/deleteBoard", async (req,res) =>{
    userBoard.deleteMany({title: req.body.boardName}, function(err,removed) {
    res.json({"temp": "temp"})
    })
});

router.post("/modifyBoardTitle", async (req,res) =>{
    userBoard.findOneAndUpdate({title: req.body.boardName}, {title: req.body.newBoardName}, function(err,removed) {
    res.json({"temp": "temp"})
    })
});



router.post("/createCard", (req,res) =>{

    let tempCard = new cardModel({
        title: req.body.newCardName,
        description: req.body.newCardDesc,
        date: req.body.newCardDeadline,
        comment: req.body.newCardComment,
        colour: req.body.newCardColour
        })

    userBoard.findOneAndUpdate({title: req.body.boardName},

        {$push: {cards: tempCard, $position: req.body.boardName}},
        function(err, doc) {
            if(err){
            console.log(err);
            }else{
            //do stuff
            res.json({ "temp": "temp"})
            }
        }
     );
});

router.delete("/deleteCard", (req,res) =>{
    userBoard.findOneAndUpdate(
        { title: req.body.boardName},
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
    // userBoard.findOneAndUpdate(
    //     { title: req.body.boardName, cards: { "title": "please" }}, {"title" : "u2"}, 
                 
    //     function(err, doc) {
    //     if(err){
    //     console.log(err);
    //     }else{
    //     //do stuff
    //     res.json({ "temp": "temp"})
    //     }
    // })

    // userBoard.update(
    //     { title: req.body.boardName }, 
    //     { "$set": { "cards.$.title": "it works" } }
    // )

    // userBoard.findOneAndUpdate(
    //     { title: req.body.boardName, "cards.title" : "please" },
    //     { "cards.title" : "it worked"
    //     },     
    //     function(err, doc) {
    //     if(err){
    //     console.log(err);
    //     }else{
    //     //do stuff
    //     res.json({ "temp": "temp"})
    //     }
    // })

    //userBoard.update({"cards.title":"please"},{$set:{"cards.title":"YES"}})

    


    res.json({ "temp": "temp"})
});





router.post("/initialUserBoard", (req,res) =>{

    new userBoard({title: "completed"}).save();
    new userBoard({title: "in progress"}).save();
    res.json({"temp": "temp"})


});
    


module.exports = router;