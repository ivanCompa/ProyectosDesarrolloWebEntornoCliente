const API_BASE = "http://localhost:3000";

async function loadHistoric() {
  try {
    const response = await fetch(`${API_BASE}/pokemonData`);
    if (!response.ok) throw new Error("Error al cargar histórico");
    const historic = await response.json();
    renderHistoric(historic);
  } catch (error) {
    console.error(error);
  }
}

function renderHistoric(historic) {
  const v = document.getElementById("historic");
  v.innerHTML = "";

  const title = document.createElement("h2");
  title.textContent = "Historic";
  v.appendChild(title);

  const table = document.createElement("table");
  v.appendChild(table);

  const header = document.createElement("tr");
  [
    "DateStart",
    "DateEnd",
    "PokeName",
    "DamageDoneTrainer",
    "DamageDonePokemon",
    "Catch",
    "Shiny",
  ].forEach((t) => {
    const th = document.createElement("th");
    th.textContent = t;
    header.appendChild(th);
  });
  table.appendChild(header);

  historic.forEach((h) => {
    const row = document.createElement("tr");

    const cells = [
      h.dateStart,
      h.dateEnd,
      h.pokeName,
      h.damageDoneTrainer,
      h.damageDonePokemon,
      h.pokemonCatched ? "☑" : "☐",
      h.pokeShiny ? "✨" : "—",
    ];

    cells.forEach((val) => {
      const td = document.createElement("td");
      td.textContent = val;
      row.appendChild(td);
    });

    table.appendChild(row);
  });
}

loadHistoric();
