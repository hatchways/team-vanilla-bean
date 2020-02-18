const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationRules, validate } = require("../auth/validateRequest");

//Models
const User = require("../models/User");

router.post("/signup", validationRules(), validate, async (req, res) => {
  const { email, password } = req.body;
  try {
    // Check if user exists
    let user = await User.findOne({ email });

    // Do not save if user exists
    if (user) {
      res.status(400).json({ error: "Email already exists" });
    }

    //Create new user
    user = new User({
      email,
      password
    });

    // Encrypt password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    //Save user
    await user.save();
    const payload = {
      id: user.id
    };

    //Create JWT with user ID
    jwt.sign(
      payload,
      process.env.JWT_SECRET_KEY,
      { expiresIn: 36000000 },
      (err, token) => {
        if (err) throw err;
        res.status(200).json({ token });
      }
    );
  } catch (err) {
    res.status(500).end();
  }
});

router.post("/signin", validationRules(), validate, async (req, res) => {
  const { email, password } = req.body;
  try {
    // Find user
    const user = await User.findOne({ email });

    //Do not login if user doesn't exist
    if (!user) {
      return res.status(404).json({ error: "Email not found" });
    }

    // Check if password is correct
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        const payload = {
          id: user.id
        };
        //Create JWT with user ID
        jwt.sign(
          payload,
          process.env.JWT_SECRET_KEY,
          { expiresIn: 36000000 },
          (err, token) => {
            if (err) throw err;
            res.status(200).json({ token });
          }
        );
      } else {
        //Incorrect password
        return res.status(400).json({ error: "Password is incorrect" });
      }
    });
  } catch (err) {
    res.status(500).end();
  }
});

module.exports = router;
