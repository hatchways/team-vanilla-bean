const express = require('express');
const router = express.Router();
let simpleModel = require("../database");

//delete table on startup for testing
// simpleModel.deleteMany({}, function(err,removed) {
// });


router.get("/allBoards", async (req,res) =>{
    try {
      var lookupUsername = req.query.username
      const boards = await simpleModel.find({username : lookupUsername});
      res.json(boards)
    } catch (err){
      res.json({message: err})
    }
  });

router.post("/createBoard", (req,res) =>{
simpleModel.findOneAndUpdate({username: req.body.username},

    {$push: {boards: {title: req.body.newBoardName, cards: []}, $position: req.body.boardPos}},
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


router.delete("/deleteBoard", (req,res) =>{

simpleModel.update(
    { username: req.body.username },
    {$pull : {"boards" : {"title": req.body.boardName}}},
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


router.post("/createCard", (req,res) =>{
simpleModel.update(
    { username: req.body.username, "boards.title": req.body.boardName},
    { "$push": 
        {"boards.$.cards": 
            {
            "title": req.body.newCardName,
            "desc": "descripTest",
            "deadline": "dateTest",
            "comment": "commentTest"
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
}
)
});



router.delete("/deleteCard", (req,res) =>{
simpleModel.update(
    { username: req.body.username, "boards.title": req.body.boardName},
    { "$pull": 
        {"boards.$.cards": 
            {
                "name": req.body.CardName
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
}
)
});

router.post("/initialUserBoard", async (req,res) =>{
// authenticate user
const newBoard = new simpleModel({
        username: req.body.username,
        boards: [{title: "in progress", cards: []},
            {title: "completed", cards: []}]
})
newBoard.save()
res.json({ "temp": "temp"})
});

  

module.exports = router;