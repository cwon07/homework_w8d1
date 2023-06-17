require('dotenv').config()
const express = require('express');
const morgan = require("morgan")
const app = express();
const PORT = process.env.PORT; 

const pokemons = require('./models/pokemon')

app.use(morgan("dev"))

app.get("/", (req, res) => {
    res.send(`welcome to pokedex`)
})

// INDEX
app.get("/pokemon", (req, res) => {
    res.render("index.ejs", {pokemons})
})

// SHOW
app.get("/pokemon/:id", (req, res) => {
    const id = req.params.id
    const pokemon = pokemons[id]
    res.render("show.ejs", ({pokemon}))
})
app.listen(PORT, () => {
    console.log(`listening on ${PORT}`)
})