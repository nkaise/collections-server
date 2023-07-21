const Router = require('express');
const Users = require("../models/Users");
const router = new Router();
const authMiddleware = require('../middleware/auth.middleware');

router.get('/users', authMiddleware, async (req, res) => {
    try {
        const users = await Users.find({}, 'id email role status');
        return res.json(users);
    } catch (e) {
        console.log(e);
        res.send({message: "Server error"});
    }
});

router.delete('/users/:id', authMiddleware, async (req, res) => {
    try {
        const userId = req.params.id;
        await Users.findByIdAndDelete(userId);
        return res.json({ message: "User deleted" });
    } catch (e) {
        console.log(e);
        res.send({ message: "Server error" });
    }
});

router.put('/users/:id', authMiddleware, async (req, res) => {
    try {
      const userId = req.params.id;
      const { status, role } = req.body;
      const user = await Users.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      if (status) {
        user.status = status;
        await user.save();
        return res.json({ message: "User status updated", status: user.status });
      } else if (role) {
        user.role = role;
        await user.save();
        return res.json({ message: "User role updated", role: user.role });
      } else {
        return res.status(400).json({ message: "Invalid request" });
      }
    } catch (e) {
      console.log(e);
      res.send({ message: "Server error" });
    }
});

module.exports = router