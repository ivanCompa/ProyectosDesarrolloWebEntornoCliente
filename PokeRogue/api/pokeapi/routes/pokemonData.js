var express = require("express");
var router = express.Router();

let PokemonData = require("../models/pokemonDataModel");
let arrayPokemons = [];
let contador = 0;

router.get("/:id", (req, res) => {
  let pokemon = arrayPokemons.filter((x) => x.id == req.params.id);
  if (pokemon.length === 0) {
    res.status(404).send("Not Found");
  } else {
    res.json(pokemon);
  }
});

router.get("/", function (req, res, next) {
  res.json(arrayPokemons);
});

router.post("/", function (req, res, next) {
  const pokemon = new PokemonData(
    req.body.dateStart,
    req.body.dateEnd,
    req.body.pokeName,
    req.body.damageDoneTrainer,
    req.body.damageDonePokemon,
    req.body.pokemonCatched,
    req.body.pokeShiny,
  );
  pokemon.id = contador;

  arrayPokemons.push(pokemon);
  contador++;
  res.status(201).json(pokemon);
});

router.delete("/:id", (req, res) => {
  let arrayPokemonsFiltrado = arrayPokemons.filter(
    (x) => x.id != req.params.id,
  );
  if (arrayPokemonsFiltrado.length === arrayPokemons.length) {
    res.status(404).send("Not Found");
  } else {
    arrayPokemons = arrayPokemonsFiltrado;
    res.send(true);
  }
});

router.put("/:id", (req, res) => {
  let pokemon = undefined;
  for (let index = 0; index < arrayPokemons.length; index++) {
    if (parseInt(req.params.id) === arrayPokemons[index].id) {
      pokemon = new PokemonData(
        arrayPokemons[index].id,
        req.body.dateStart,
        req.body.dateEnd,
        req.body.pokeName,
        req.body.damageDoneTrainer,
        req.body.damageDonePokemon,
        req.body.pokemonCatched,
        req.body.pokeShiny,
      );
      arrayPokemons[index] = pokemon;
      res.json(pokemon);
    }
  }

  if (!pokemon) {
    res.status(404).send("Not Found");
  }
});

module.exports = router;
