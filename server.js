// IMPORT DEPENDENCIES & SETUP
require('dotenv').config();
const express = require('express');
const morgan = require("morgan");
const app = express();
const PORT = process.env.PORT; 
const methodOverride = require("method-override")

const pokemons = require("./models/pokemon")
const retrievePokemonData = () => {
    return []
}

// MIDDLEWARE
app.use(morgan("dev"))
app.use(express.static("public"))
app.use(express.urlencoded({extended: false}))
app.use(methodOverride("_method"))


// ROUTES

// INDEX - GET - SHOWS ALL POKEMONS
app.get("/pokemon", (req, res) => {
    const updatedPokemons = retrievePokemonData();
    res.render("index.ejs", {pokemons, updatedPokemons})
})

// NEW - GET - RENDER FORM TO CREATE A POKEMON
app.get("/pokemon/new", (req, res) => {
    res.render("new.ejs")
})

// DESTROY - DELETE - DELETE A FRUIT
app.delete("/pokemon/:id", (req, res) => {
    const id = req.params.id
    pokemons.splice(id ,1)
    res.redirect("/pokemon")
})

// UPDATE - PUT - UPDATE A POKEMON
app.put("/pokemon/:id", (req, res) => {
    const id = req.params.id
    pokemons[id] = req.body
    res.redirect("/pokemon")
})

// CREATE - POST - CREATE A POKEMON
app.post("/pokemon", (req, res) => {
    pokemons.push(req.body)
    res.redirect("/pokemon")
 })

// EDIT - GET - RENDER FORM TO UPDATE A POKEMON
app.get("/pokemon/:id/edit", (req, res) => {
    const id = req.params.id
    const pokemon = pokemons[id]
    const updatedPokemons = retrievePokemonData();
    res.render("edit.ejs", {pokemon, id, updatedPokemons})
})
 

// SHOW - GET - SHOWS ONE POKEMON 
app.get("/pokemon/:id", (req, res) => {
    const id = req.params.id
    const pokemon = pokemons[id]
    res.render("show.ejs", ({pokemon, id}))
})



// LISTENER
app.listen(PORT, () => {
    console.log(`listening on ${PORT}`)
})