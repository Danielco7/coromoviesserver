const express = require("express");
const memberBLL = require("../BLL/memberBLL");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const members = await memberBLL.getAllMembers();
    res.send(members);
  } catch (error) {
    res.send(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const member = await memberBLL.getMemberById(id);
    res.send(member);
  } catch (error) {
    res.send(error);
  }
});

router.post("/", async (req, res) => {
  try {
    const member = req.body;
    const result = await memberBLL.addMember(member);
    res.send(result);
  } catch (error) {
    res.send(error);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const member = req.body;
    const result = await memberBLL.updateMember(id, member);
    res.send(result);
  } catch (error) {
    res.send(error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const result = await memberBLL.deleteMember(id);
    res.send(result);
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
