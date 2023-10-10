const express = require("express");
const router = express.Router();
const { User, userService } = require("../userService");

router.post("/", async (req, res, next) => {
    try {
      // Using function registerUser from userService.js
      const user = await userService.registerAdministrator(req.body);
      return res.status(201).json({ message: "Administrator registered successfully", user });
    } catch (error) {
      return next(error);
    }
  });
  
  module.exports = router;