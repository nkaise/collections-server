const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
const authRouter = require("./routes/auth.routes");
const dataRouter = require("./routes/data.routes");
const collectionRouter = require("./routes/collection.routes");
const app = express();
const PORT = config.get('serverPort');
// const corsMiddleware = require('./middleware/cors.middleware');
const Users = require("./models/Users");
const Themes = require("./models/Themes");
const bcrypt = require('bcryptjs');

// app.use(corsMiddleware);
const cors = require('cors');
app.use(cors());

app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/data", dataRouter);
app.use("/api/collection", collectionRouter);

const start = async () => {
    const plainPassword = config.get("PASSWORD");
    try {
        await mongoose.connect(config.get("dbUrl"));
        app.listen(PORT, () => {
            console.log(`Server started on port ${PORT}`)
        });
        
        const themesCount = await Themes.countDocuments();

        if (themesCount === 0) {
          const themesData = [
            { name: "Books" },
            { name: "Shoes" },
            { name: "Wines" },
            { name: "Cards" },
            { name: "Coins" },
            { name: "Pictures" },
            { name: "Toys" },
            // Добавьте другие темы
          ];
        
          const createdThemes = await Themes.insertMany(themesData);
          console.log("Таблица Themes создана и заполнена данными по умолчанию:", createdThemes);
        } else {
          console.log("Данные в таблице уже созданы");
        }

        const hashedPassword = await bcrypt.hash(plainPassword, 6);

        const admin = await Users.findOne({ role: 'admin' });
        if (admin) {
          console.log('Администратор уже существует');
          return;
        }
        const defaultAdmin = new Users({
          email: 'admin@admin.com',
          password: hashedPassword,
          role: 'admin'
        });
        await defaultAdmin.save();

    } catch (e) {
        console.error('Ошибка ', e)
    }
};

start();