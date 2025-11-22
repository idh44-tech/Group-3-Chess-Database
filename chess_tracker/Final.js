// Tracker.js - unified version (no JSON file)

// Elements
const searchInput = document.getElementById('search');
const eloTableBody = document.querySelector('.elo_chart tbody');
const playerList = document.getElementById('Player-List');
const playerForm = document.getElementById('playerForm');
const playerNameInput = document.getElementById('Player_Name');
const ratingInput = document.getElementById('Rating');
const imageInput = document.getElementById('Player_Image');

// Data containers
let playerData = []; // for Elo table + search
let CardArray = [];  // for player cards

// ------------------ Default player list ------------------
const defaultPlayers = [
  { name: "Bruce Wayne", id: "123456", elo: 2775 },
  { name: "Tony Stark", id: "548249", elo: 2760 },
  { name: "Peter Parker", id: "357891", elo: 2680 },
  { name: "Clark Kent", id: "398765", elo: 2645 },
  { name: "Bruce Banner", id: "981543", elo: 2610 }
];

// ------------------ Load players (from localStorage or defaults) ------------------
function loadPlayerData() {
  const saved = localStorage.getItem('playerData');
  if (saved) {
    try {
      playerData = JSON.parse(saved);
      console.log("Loaded player data from localStorage");
    } catch {
      playerData = defaultPlayers;
    }
  } else {
    playerData = defaultPlayers;
    localStorage.setItem('playerData', JSON.stringify(defaultPlayers));
  }
  renderPlayers(playerData);
}

// ------------------ Render players into Elo table ------------------
function renderPlayers(data) 
{
  eloTableBody.innerHTML = '';
  if (data.length === 0) {
    eloTableBody.innerHTML = `<tr><td colspan="5">No players found</td></tr>`;
    return;
  }

  data.forEach((player, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${player.name}</td>
      <td>${player.id}</td>
      <td>${player.elo}</td>
      <td><button class="delete-btn" data-id="${player.id}">Delete</button></td>
    `;
    eloTableBody.appendChild(row);
  });

  document.querySelectorAll('.delete-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    const playerId = e.target.getAttribute('data-id'); // keep as string
    console.log("Clicked delete for ID:", playerId);

    // Remove from playerData
    playerData = playerData.filter(p => p.id !== playerId);
    localStorage.setItem('playerData', JSON.stringify(playerData));

    // Re-render the table
    renderPlayers(playerData);
  });
});

}


// ------------------ Search / Filter ------------------
searchInput.addEventListener('input', () => {
  const query = searchInput.value.toLowerCase();
  const filtered = playerData.filter(p =>
    p.name.toLowerCase().includes(query) ||
    p.id.toString().includes(query) ||
    p.elo.toString().includes(query)
  );
  renderPlayers(filtered);
});

// ------------------ Load Player Cards ------------------
window.addEventListener('DOMContentLoaded', () => {
  const savedCards = localStorage.getItem('CardArray');
  if (savedCards) {
    CardArray = JSON.parse(savedCards);
  }
  autopopulateCards(CardArray);
  loadPlayerData();
});

// ------------------ Add Player Form ------------------
playerForm.addEventListener('submit', function (e) {
  e.preventDefault();

  const playerName = playerNameInput.value.trim();
  const rating = ratingInput.value.trim();

  if (!playerName || !rating) return;

  let imgSrc = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";
  if (imageInput.files && imageInput.files[0]) {
    imgSrc = URL.createObjectURL(imageInput.files[0]);
  }

  // --- 1️⃣ Create Card ---
  const playerCard = { playerName, rating, imgSrc };
  CardArray.push(playerCard);
  localStorage.setItem('CardArray', JSON.stringify(CardArray));
  autopopulateCards(CardArray);

  // --- 2️⃣ Add to Elo Table Data ---
  const newPlayer = {
    name: playerName,
    id: generateID(),
    elo: parseInt(rating, 10) || 0
  };

  playerData.push(newPlayer);
  localStorage.setItem('playerData', JSON.stringify(playerData));
  renderPlayers(playerData);

  // --- 3️⃣ Reset Form ---
  playerForm.reset();
});

// ------------------ Display Player Cards ------------------
function autopopulateCards(cards) {
  playerList.innerHTML = "";
  if (cards.length === 0) {
    playerList.innerHTML = "<p>No player cards yet.</p>";
    return;
  }

  cards.forEach((card, index) => {
    const div = document.createElement('div');
    div.classList.add('player-card');
    div.innerHTML = `
      <img src="${card.imgSrc}" alt="${card.playerName}">
      <h3>${card.playerName}</h3>
      <p>Rating: ${card.rating}</p>
      <button class="delete-btn" data-index="${index}">Delete</button>
    `;
    playerList.appendChild(div);
  });

  document.querySelectorAll('.delete-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const idx = parseInt(e.target.getAttribute('data-index'));
      CardArray.splice(idx, 1);
      localStorage.setItem('CardArray', JSON.stringify(CardArray));
      autopopulateCards(CardArray);
    });
  });
}

// ------------------ Helper: Generate random ID ------------------
function generateID() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}
