//You will code the route in this file
//Lecture Code Refernece -> https://github.com/stevens-cs546-cs554/CS-546/tree/master/lecture_05/code/routes

const express = require('express');
const router = express.Router();
const data = require('../data');
const pokemonData = data.pokemon;
const helpers = require('../helpers');


router
    .route('/pokemon')
    .get(async (req, res) => {
        try {
            const pokemonList = await pokemonData.pokemon();
            res.json(pokemonList);
        } catch (e) {
            res.status(500).send(e);
        }
    });

router
    .route('/pokemon/:id')
    .get(async (req, res) => {
        try {
            req.params.id = req.params.id.trim();
            if (!helpers.isPositiveInteger(req.params.id))
                return res.status(400).send({Message: "Invalid URL Parameter"});
            else {
                const pokemon = await pokemonData.pokemonById(req.params.id);
                res.json(pokemon);
            }
        } catch (e) {
            res.status(404).send({Message: "Pokémon Not Found!"});
        }
    });

module.exports = router;