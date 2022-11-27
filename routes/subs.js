const express = require("express");
const subsBLL = require("../BLL/subsBLL");
const router = express.Router();
const { authtoken } = require("../auth/authToken");

router.get("/", async (req, res) => {
  try {
    const subs = await subsBLL.getAllSubs();
    res.send(subs);
  } catch (error) {
    res.send(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const sub = await subsBLL.getSubById(id);
    res.send(sub);
  } catch (error) {
    res.send(error);
  }
});

router.post("/", authtoken, async (req, res) => {
  try {
    const sub = req.body;
    const result = await subsBLL.addSub(sub);
    res.send(result);
  } catch (error) {
    res.send(error);
  }
});

router.put("/:id", authtoken, async (req, res) => {
  try {
    const id = req.params.id;
    const sub = req.body;
    const result = await subsBLL.updateSub(id, sub);
    res.send(result);
  } catch (error) {
    res.send(error);
  }
});

router.delete("/:id", authtoken, async (req, res) => {
  try {
    const id = req.params.id;
    const result = await subsBLL.deleteSub(id);
    res.send(result);
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
