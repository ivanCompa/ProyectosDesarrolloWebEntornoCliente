class PokemonData {
  constructor(
    dateStart,
    dateEnd,
    pokeName,
    damageDoneTrainer,
    damageDonePokemon,
    pokemonCatched,
    pokeShiny,
  ) {
    this.dateStart = dateStart;
    this.dateEnd = dateEnd;
    this.pokeName = pokeName;
    this.damageDoneTrainer = damageDoneTrainer;
    this.damageDonePokemon = damageDonePokemon;
    this.pokemonCatched = pokemonCatched;
    this.pokeShiny = pokeShiny;
  }
}

module.exports = PokemonData;
