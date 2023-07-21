const Router = require('express');
const Users = require("../models/Users");
const bcrypt = require('bcryptjs');
const config = require("config");
const jwt = require('jsonwebtoken');
const router = new Router();
const authMiddleware = require('../middleware/auth.middleware');

router.post('/register', async (req, res) => {
    try {
        const {email, password} = req.body;
        const candidate = await Users.findOne({email});
        if (candidate) {
            return res.status(400).json({message: `User with email ${email} already exists`});
        }
        const hashPassword = await bcrypt.hash(password, 6);
        const user = new Users({email, password: hashPassword});
        await user.save();
        return res.json({message: "User was created. You'll be redirected to the login page"});
    } catch (e) {
        console.log(e);
        res.send({message: "Server error"});
    }
});

router.post('/login', async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await Users.findOne({email});
        if (user.status === 'blocked') {
            return res.status(404).json({message: "Your account is blocked"});
        }
        if (!user) {
            return res.status(404).json({message: "User not found"});
        }
        const isPassValid = bcrypt.compareSync(password, user.password);
        if (!isPassValid) {
            return res.status(400).json({message: "Invalid password"});
        }
        const token = jwt.sign({id: user.id}, config.get("secretKey"), {expiresIn: "24h"});
        return res.json({
            token,
            user: {
                id: user.id,
                email: user.email
            }
        });
    } catch (e) {
        console.log(e);
        res.send({message: "Server error"});
    }
});

router.get('/auth', authMiddleware, async (req, res) => {
    try {
        const user = await Users.findOne({_id: req.user.id});
        const token = jwt.sign({id: user.id}, config.get("secretKey"), {expiresIn: "24h"});
        return res.json({
            token,
            user: {
                id: user.id,
                email: user.email,
                role: user.role
            }
        });
    } catch (e) {
        console.log(e);
        res.send({message: "Server error"});
    }
});

module.exports = router