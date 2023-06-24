// IMPORT DEPENDENCIES & SETUP
require('dotenv').config();
const express = require('express');
const morgan = require("morgan");
const app = express();
const PORT = process.env.PORT; 
const methodOverride = require("method-override")
const pokemonsRouter = require("./controllers/pokemons")

// MIDDLEWARE
app.use(morgan("dev"))
app.use("../public", express.static("public"))
app.use(express.urlencoded({extended: false}))
app.use(methodOverride("_method"))
app.use("/pokemon", pokemonsRouter)


// LISTENER
app.listen(PORT, () => {
    console.log(`listening on ${PORT}`)
})