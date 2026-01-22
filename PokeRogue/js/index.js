let trainerHP = 1000;
let currentBattle = null;

const API_BASE = "http://localhost:3000";

function crearFecha() {
  return new Date()
    .toLocaleString("es-ES", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    })
    .replace(",", "");
}

async function generarPokemon() {
  const id = Math.floor(Math.random() * 100) + 1;
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const data = await res.json();

  const hp = data.stats.find((s) => s.stat.name === "hp").base_stat;
  const atk = data.stats.find((s) => s.stat.name === "attack").base_stat;
  const shiny = Math.random() < 0.05;

  return {
    name: data.name,
    hpMax: hp,
    hp: hp,
    attack: atk,
    sprite: shiny ? data.sprites.front_shiny : data.sprites.front_default,
    shiny,
    start: crearFecha(),
    damageTrainer: 0,
    damageReceivedTrainer: 0,
    damageDonePokemon: 0,
  };
}

async function crearBattle() {
  currentBattle = await generarPokemon();
  renderBattle();
}

function createBar(percent, label = "") {
  const bar = document.createElement("div");
  bar.className = "progress-bar";

  const fill = document.createElement("div");
  fill.className = "progress-fill";
  fill.style.width = percent + "%";
  fill.textContent = percent + (label ? ` ${label}` : "%");

  bar.appendChild(fill);
  return bar;
}

function renderBattle() {
  const img = document.getElementById("pokemon-img");
  const name = document.getElementById("pokemon-name");
  const hpBar = document.getElementById("pokemon-hp");
  const atk = document.getElementById("pokemon-atk");
  const trainerBar = document.getElementById("trainer-hp");

  img.src = currentBattle.sprite;

  if (currentBattle.shiny) {
    name.innerHTML = `<span class="shiny">${currentBattle.name}</span>`;
  } else {
    name.textContent = currentBattle.name;
  }

  const hpPercent = Math.round((currentBattle.hp / currentBattle.hpMax) * 100);
  hpBar.style.width = hpPercent + "%";
  hpBar.textContent = hpPercent + "%";

  atk.textContent = "Attack: " + currentBattle.attack;

  const trainerPercent = Math.round((trainerHP / 1000) * 100);
  trainerBar.style.width = trainerPercent + "%";
  trainerBar.textContent = trainerPercent + "%";
}

function atacar() {
  const dmg = Math.floor(Math.random() * 40);
  currentBattle.hp -= dmg;
  currentBattle.damageTrainer += dmg;
  currentBattle.damageDonePokemon += dmg;

  if (currentBattle.hp <= 0) {
    finBattle(false);
    return;
  }

  trainerHP -= currentBattle.attack;
  currentBattle.damageReceivedTrainer += currentBattle.attack;

  if (trainerHP <= 0) {
    trainerHP = 1000;
    crearBattle();
    return;
  }

  renderBattle();
}

function atraparPokemon() {
  const prob = 1 - currentBattle.hp / currentBattle.hpMax;
  if (Math.random() < prob) {
    finBattle(true);
  } else {
    alert("Falló la captura");
  }
}

async function guardarPokemonTeam(pokemon) {
  try {
    const response = await fetch(`${API_BASE}/pokemonTeam`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(pokemon),
    });
    if (!response.ok) throw new Error("Error al guardar Pokémon en Team");
    console.log("Pokémon guardado en Team:", await response.json());
  } catch (error) {
    console.error(error);
  }
}

async function guardarDatosPokemon(data) {
  try {
    const response = await fetch(`${API_BASE}/pokemonData`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Error al guardar histórico");
    console.log("Histórico guardado:", await response.json());
  } catch (error) {
    console.error(error);
  }
}

function finBattle(caught) {
  const end = crearFecha();

  let damageDonePokemon = currentBattle.damageDonePokemon;

  if (caught) {
    const recovered = 50;
    damageDonePokemon = Math.max(0, damageDonePokemon - recovered);

    const pokemonTeam = {
      pokeName: currentBattle.name,
      pokeLevel: 1,
      pokeShiny: currentBattle.shiny,
      sprite: currentBattle.sprite,
    };

    guardarPokemonTeam(pokemonTeam);
  }

  const pokemonData = {
    dateStart: currentBattle.start,
    dateEnd: end,
    pokeName: currentBattle.name,
    damageDoneTrainer: currentBattle.damageTrainer,
    damageReceivedTrainer: currentBattle.damageReceivedTrainer,
    damageDonePokemon: damageDonePokemon,
    pokemonCatched: caught,
    pokeShiny: currentBattle.shiny,
  };

  guardarDatosPokemon(pokemonData);

  crearBattle();
}

document.getElementById("btn-attack").onclick = atacar;
document.getElementById("btn-capture").onclick = atraparPokemon;
document.getElementById("btn-escape").onclick = crearBattle;

crearBattle();
