const API_BASE = "http://localhost:3000";

async function loadTeam() {
  try {
    const response = await fetch(`${API_BASE}/pokemonTeam`);
    if (!response.ok) throw new Error("Error al cargar equipo");
    const team = await response.json();
    renderTeam(team);
  } catch (error) {
    console.error(error);
  }
}

function renderTeam(team) {
  const v = document.getElementById("team");
  v.innerHTML = "";

  const title = document.createElement("h2");
  title.textContent = "Team";
  v.appendChild(title);

  if (!team.length) {
    const p = document.createElement("p");
    p.textContent = "No hay pokemons";
    v.appendChild(p);
    return;
  }

  team.forEach((p) => {
    const card = document.createElement("div");
    card.className = "team-card";

    const img = document.createElement("img");
    img.src = p.sprite;
    card.appendChild(img);

    const name = document.createElement("p");
    name.textContent = p.pokeName;
    card.appendChild(name);

    const lvl = document.createElement("p");
    lvl.textContent = "Lvl: " + p.pokeLevel;
    card.appendChild(lvl);

    v.appendChild(card);
  });
}

loadTeam();
