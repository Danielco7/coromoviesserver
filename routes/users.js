const express = require("express");
const usersBLL = require("../BLL/usersBLL");
const memberBLL = require("../BLL/memberBLL");
const router = express.Router();
const bcrypt = require("bcrypt");
const Usermodel = require("../models/usersmodels");
const { genToken, authtoken } = require("../auth/authToken");

router.get("/", async (req, res) => {
  try {
    const users = await usersBLL.getAllUsers();
    res.send(users);
  } catch (error) {
    res.send(error);
  }
});

router.get("/userInfo", authtoken, async (req, res) => {
  let user = await Usermodel.findOne({ _id: req.tokenData._id });
  res.json(user);
});

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const user = await usersBLL.getUserById(id);
    res.send(user);
  } catch (error) {
    res.send(error);
  }
});

router.post("/", authtoken, async (req, res) => {
  try {
    let user = req.body;
    user.password = await bcrypt.hash(user.password, 10);
    const result = await usersBLL.addUser(user);
    res.send(result);
  } catch (error) {
    res.send(error);
  }
});

router.post("/login", async (req, res) => {
  let user1 = req.body;
  let user = await Usermodel.findOne({ _id: user1._id });
  try {
    if (!user) {
      return res.status(401).json({ msg: "User not found" });
    }
    let password = await bcrypt.compare(user1.password, user.password);
    if (!password) {
      return res.status(401).json({ msg: "password not found" });
    } else {
      let newToken = genToken(user._id);
      res.json({ msg: "all good", token: newToken });
    }
  } catch (error) {
    res.send(error);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    let user = req.body;
    user.password = await bcrypt.hash(user.password, 10);
    const result = await usersBLL.updateUser(id, user);
    res.send(result);
  } catch (error) {
    res.send(error);
  }
});

router.delete("/:id", authtoken, async (req, res) => {
  try {
    const id = req.params.id;
    const result = await usersBLL.deleteUser(id);
    res.send(result);
  } catch (error) {
    res.send(error);
  }
});

router.get("/member", async (req, res) => {
  try {
    const users = await memberBLL.getAllMembers();
    res.send(users);
  } catch (error) {
    res.send(error);
  }
});
module.exports = router;
