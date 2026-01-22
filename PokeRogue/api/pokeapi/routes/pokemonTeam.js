var express = require("express");
var router = express.Router();

let PokemonTeam = require("../models/pokemonTeamModel");
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
  const { pokeName, pokeLevel, pokeShiny, sprite } = req.body;

  // 1. Buscar si ya existe en el equipo
  let existing = arrayPokemons.find((p) => p.pokeName === pokeName);

  if (existing) {
    // 2. Si existe → subir nivel
    existing.pokeLevel += 1;

    return res.status(200).json({
      message: "Nivel aumentado",
      pokemon: existing,
    });
  }

  // 3. Si no existe → crear uno nuevo
  const pokemon = new PokemonTeam(
    contador,
    pokeName,
    pokeLevel,
    pokeShiny,
    sprite,
  );

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
      pokemon = new PokemonTeam(
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
