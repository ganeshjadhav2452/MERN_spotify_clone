const dotenv = require("dotenv").config();
const express = require("express");
const cors = require("cors");
const authRoutes = require("./router/authRoutes");
const connectDB = require("./config/db");
const songRoutes = require('./router/songRoutes');
const playlistRoutes = require('./router/playlistRoutes')
const passport = require('passport');
require('./utils/helpers/passportJWT')(passport);

const app = express();
// app middlewares
app.use(cors());
app.use(express.json())


// routers
app.use('/auth', authRoutes);
app.use('/song', songRoutes);
app.use('/playlist', playlistRoutes);


// ... (other middleware setup)

app.use(passport.initialize());
// connecting to database
connectDB();

app
    .listen(process.env.PORT, (res) =>
        console.log("server startedd on port :", process.env.PORT)
    )
    .on("error", (err) => console.log("connecting server error: ", err));
