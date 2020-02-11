const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");
//@route /user/signin
//@desc signin route
//@route public
router.post(
  "/signup",
  [
    check("email", "please include a valid email").isEmail(),
    check("password", "please enter a password with 6").isLength({
      min: 6
    })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      //return error in json format
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      // See if user exists
      let user = await User.findOne({ email });

      if (user) {
        //return error in json format
        res.status(400).json({ errors: [{ msg: "User already exists" }] });
      }

      user = new User({
        email,
        password
      });
      // Encrypt password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      // register hashed password and email. it returns ID.
      await user.save();
      const payload = {
        user: {
          id: user.id
        }
      };

      //create JWT with user ID. Secret key is in .env file
      jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: 36000000 }, (err, token) => {
        if (err) throw err;
        res.json({ token });
      });
    } catch (err) {
      res.status(500).send("server error");
    }
  }
);

//@route /user/signup
//@desc signup route
//@route public
router.post("/signin", function(req, res, next) {
  console.log(req.body);
  res.send("user signup");
  //   const teamName = req.body.teamName;

  //   if (teamName && process.env.TEAM_MEMBERS && process.env.TEAM_MEMBERS.indexOf(teamName) >= 0)
  //     res.status(200).send({ response: `${teamName} is part of the team!` });
  //   else
  //     res.status(400).send({
  //       response: `${teamName} is not part of the team. Modify your .env`
  //     });
});

module.exports = router;
