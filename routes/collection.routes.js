const Router = require('express');
const Collection = require("../models/Collections");
const Themes = require("../models/Themes");
const router = new Router();
const authMiddleware = require('../middleware/auth.middleware');
const { populate } = require("mongoose");
const Items = require('../models/Items');

router.post('/createcollection', authMiddleware, async (req, res) => {
    try {
        const { name, description, theme, userId, additionalFieldsArray } = req.body;
        const collection = new Collection({
            name: name,
            description: description,
            theme: theme,
            userId: userId,
            additionalFields: additionalFieldsArray
        });
        await collection.save();
        res.json({message: 'Collection has been successfully created'});
    } catch (e) {
        console.log(e);
        res.status(500).json({message: 'Server error'})
    }
});

router.post('/createitem', authMiddleware, async (req, res) => {
    try {
        const { name, tags, collectionId } = req.body;
        const collection = new Items({
            name: name,
            tags: tags,
            collectionId: collectionId,
        });
        await collection.save();
        res.json({message: 'Item has been successfully created'});
    } catch (e) {
        console.log(e);
        res.status(500).json({message: 'Server error'})
    }
});

router.get('/items', async (req, res) => {
    try {
        const items = await Items.find({}, 'name tags collectionId');
        res.json({ items });
    } catch (e) {
        console.log(e);
        res.send({message: "Server error"});
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

router.get('/getcollections', async (req, res) => {
    try {
      const collections = await Collection.find({}, 'name description theme userId');
      res.json({ collections });
    } catch (e) {
      console.log(e);
      res.send({ message: "Server error" });
    }
});

module.exports = router