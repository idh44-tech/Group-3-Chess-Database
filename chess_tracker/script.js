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
function loadPlayerData() 
{
    //create constnat to load from local storage
  const saved = localStorage.getItem('playerData');
  if (saved) 
    {

    try 
    {
        //parse the saved data
      playerData = JSON.parse(saved);
      console.log("Loaded player data from localStorage");
    } 
    catch 
    {
      //if error load default players
      playerData = defaultPlayers;
    }
  } 
  else 
    {
        //if nothing in local storage load default players
    playerData = defaultPlayers;
    localStorage.setItem('playerData', JSON.stringify(defaultPlayers));
  }
  //render the players
  renderPlayers(playerData);
}

// ------------------ Render players into Elo table ------------------
function renderPlayers(data) 
{
    //clear existing rows
  eloTableBody.innerHTML = '';
  //handle no data case
  if (data.length === 0) 
    {
        // Show message if no players found
    eloTableBody.innerHTML = `<tr><td colspan="5">No players found</td></tr>`;
    return;
    }
    //for each player create a row
  data.forEach((player, index) => 
    {
        // Create table row
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${player.name}</td>
      <td>${player.id}</td>
      <td>${player.elo}</td>
      <td><button class="delete-btn" data-id="${player.id}">Delete</button></td>
    `;
    // Append row to table body
    eloTableBody.appendChild(row);
  });
  // Add delete button listeners
  document.querySelectorAll('.delete-btn').forEach(btn => 
    {
        
        btn.addEventListener('click', (e) => 
        {
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
// Listen for input in search box
searchInput.addEventListener('input', () => 
    {
        // Get search query
    const query = searchInput.value.toLowerCase();
    // Filter playerData
    const filtered = playerData.filter(p =>
        p.name.toLowerCase().includes(query) ||
        p.id.toString().includes(query) ||
        p.elo.toString().includes(query)
    );
    // Render filtered results
  renderPlayers(filtered);
});

// ------------------ Load Player Cards ------------------

// On page load, get cards from localStorage
window.addEventListener('DOMContentLoaded', () => 
    {
        // Load saved cards
  const savedCards = localStorage.getItem('CardArray');
  if (savedCards) 
    {
        //look for saved cards
        CardArray = JSON.parse(savedCards);
    }
    // Display cards
  autopopulateCards(CardArray);
  loadPlayerData();
});

// ------------------ Add Player Form ------------------

// On form submit
playerForm.addEventListener('submit', function (e) 
{
    // Prevent default form submission
  e.preventDefault();
    // Get form values
  const playerName = playerNameInput.value.trim();
  const rating = ratingInput.value.trim();
    // Simple validation
  if (!playerName || !rating) return;
    // Handle image input
  let imgSrc = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";
  // Check if a file is selected
  if (imageInput.files && imageInput.files[0]) 
    {
        //profile picture upload
    imgSrc = URL.createObjectURL(imageInput.files[0]);
  }

  // --- 1️ Create Card ---

  // Create a player card object
  const playerCard = { playerName, rating, imgSrc };
  // Add to CardArray and save
  CardArray.push(playerCard);
  //save to local storage
  localStorage.setItem('CardArray', JSON.stringify(CardArray));
  // Refresh displayed cards
  autopopulateCards(CardArray);

  // --- 2️ Add to Elo Table Data ---
  // Create new player object
  const newPlayer = 
  {
    //feilds and id generation
    name: playerName,
    id: generateID(),
    elo: parseInt(rating, 10) || 0
  };
    // Add to playerData and save
  playerData.push(newPlayer);
  //save to local storage
  localStorage.setItem('playerData', JSON.stringify(playerData));
  //render players
  renderPlayers(playerData);

  // --- 3️ Reset Form ---
  playerForm.reset();
});

// ------------------ Display Player Cards ------------------
function autopopulateCards(cards) 
{
    // Clear existing cards
  playerList.innerHTML = "";
  // Handle no cards case
  if (cards.length === 0) 
    {
        // Show message if no cards
    playerList.innerHTML = "<p>No player cards yet.</p>";
    return;
  }
  // Create card elements
  cards.forEach((card, index) => 
    {
        // Create card div
    const div = document.createElement('div');
    // Add class and inner HTML
    div.classList.add('player-card');
    // Card format
    div.innerHTML = `
      <img src="${card.imgSrc}" alt="${card.playerName}">
      <h3>${card.playerName}</h3>
      <p>Rating: ${card.rating}</p>
      <button class="delete-btn" data-index="${index}">Delete</button>
    `;
    // Append to player list
    playerList.appendChild(div);
  });
  // Add delete button listeners
  document.querySelectorAll('.delete-btn').forEach(btn => 
    {
        //add listener
    btn.addEventListener('click', (e) => 
        {
            //get index
      const idx = parseInt(e.target.getAttribute('data-index'));
      // Remove from CardArray
      CardArray.splice(idx, 1);
      // Save updated array
      localStorage.setItem('CardArray', JSON.stringify(CardArray));
        // Re-render cards
      autopopulateCards(CardArray);
    });
  });
}

// ------------------ Helper: Generate random ID ------------------
function generateID() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}
