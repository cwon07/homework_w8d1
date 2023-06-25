const express = require('express')
const pokemons = require('../models/pokemon')

// ROUTER
const router = express.Router()

// ROUTES

// INDEX - GET - SHOWS ALL POKEMONS
router.get("/", (req, res) => {
    res.render("index.ejs", {pokemons})
})

// NEW - GET - RENDER FORM TO CREATE A POKEMON
router.get("/new", (req, res) => {
    res.render("new.ejs")
})

// DESTROY - DELETE - DELETE A POKEMON
router.delete("/:id", (req, res) => {
    const id = req.params.id
    pokemons.splice(id ,1)
    res.redirect("/pokemon")
})

// UPDATE - PUT - UPDATE A POKEMON
router.put("/:id", (req, res) => {
    const id = req.params.id
    pokemons[id] = {
        name: req.body.name,
        img: req.body.img,
        type: [
            req.body.type
        ],
        stats: {
            hp: req.body.hp,
            attack: req.body.attack,
            defense: req.body.defense
        }
    }
    res.redirect("/pokemon")
})

// CREATE - POST - CREATE A POKEMON
router.post("/", (req, res) => {
    let newPokemon = {
        name: req.body.name,
        img: req.body.img,
        type: [
            req.body.type
        ],
        stats: {
            hp: req.body.hp,
            attack: req.body.attack,
            defense: req.body.defense
        }
    }
    pokemons.push(newPokemon)
    res.redirect("/pokemon")
 })

// EDIT - GET - RENDER FORM TO UPDATE A POKEMON
router.get("/:id/edit", (req, res) => {
    const id = req.params.id
    const pokemon = pokemons[id]
    res.render("edit.ejs", ({pokemon, id}))
})
 

// SHOW - GET - SHOWS ONE POKEMON 
router.get("/:id", (req, res) => {
    const id = req.params.id
    const pokemon = pokemons[id]
    console.log(pokemon)
    res.render("show.ejs", ({pokemon, id}))
})

// EXPORT ROUTER
module.exports = router