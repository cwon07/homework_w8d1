require('dotenv').config()
const express = require('express');
const morgan = require("morgan")
const app = express();
const PORT = process.env.PORT; 
const methodOverride = require("method-override")

const pokemons = require('./models/pokemon')

app.use(morgan("dev"))
app.use(express.urlencoded({extended: false}))
app.use(methodOverride("_method"))

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
    res.render("show.ejs", ({pokemon, id}))
})

// NEW - GET 
app.get("/new", (req, res) => {
    res.render("new.ejs")
})

// CREATE - POST
app.post("/pokemon", (req, res) => {
   pokemons.push(req.body)
   res.redirect("/pokemon")
})

// EDIT
app.get("/pokemon/:id/edit", (req, res) => {
    const id = req.params.id
    const pokemon = pokemons[id]
    res.render("edit.ejs", {pokemon, id})
})

app.listen(PORT, () => {
    console.log(`listening on ${PORT}`)
})