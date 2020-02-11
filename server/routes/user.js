const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//Models
const User = require("../models/User");

//MiddleWare
const auth = require("../middleWare/auth");

//@route /user/signup
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

//@route /user/signin
//@desc signup route
//@route public
router.get("/signin", auth, async (req, res) => {
  try {
    //check if id exists, and return email
    let id = req.user.id;
    let user = await User.findOne({ _id: id }).select("email -_id");
    if (!user) {
      res.status(500).json({ msg: "There is no user" });
    }
    res.json(user);
  } catch (err) {
    res.status(500).send("server error");
  }
});

module.exports = router;
