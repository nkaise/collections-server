const Router = require('express');
const Collection = require("../models/Collections");
const Themes = require("../models/Themes");
const router = new Router();
const authMiddleware = require('../middleware/auth.middleware');
const { populate } = require("mongoose");

router.post('/createcollection', authMiddleware, async (req, res) => {
    try {
        const { name, description, theme, userId, additionalFields } = req.body;
        const collection = new Collection({
            name: name,
            description: description,
            // theme: theme,
            theme: { _id: theme, name: "" },
            userId: userId,
            additionalFieldSchema: additionalFields
        });
        await collection.save();
        const populatedCollection = await Collection.findById(collection._id).populate('theme');
        res.json({message: 'Collection has been successfully created'});
    } catch (e) {
        console.log(e);
        res.status(500).json({message: 'Server error'})
    }
});

router.get('/themes', authMiddleware, async (req, res) => {
    try {
        const themes = await Themes.find({}, { _id: 1, name: 1 });
        res.json({ themes });
    } catch (e) {
        console.log(e);
        res.send({message: "Server error"});
    }
});

router.get('/getcollections', authMiddleware, async (req, res) => {
    try {
      const collections = await Collection.find({}, 'name description theme');
      res.json({ collections });
    } catch (e) {
      console.log(e);
      res.send({ message: "Server error" });
    }
  });

module.exports = router