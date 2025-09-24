const itemElements = document.querySelectorAll('#item-list li');
const mainContent = document.getElementById('main-content');
const searchInput = document.getElementById('search');



itemElements.forEach(item => {
  item.addEventListener('click', () => {
    const id = item.getAttribute('data-id');
    const data = itemData[id];

    if (data) {
      mainContent.innerHTML = `
        <h2>${data.title}</h2>
        <p>${data.description}</p>
        <p><strong>More Info:</strong> ${data.extra}</p>
      `;
    } else {
      mainContent.innerHTML = `<p>No data found for "${id}"</p>`;
    }
  });
});


searchInput.addEventListener('input', function () {
  const filter = searchInput.value.toLowerCase();
  itemElements.forEach(item => {
    const text = item.textContent.toLowerCase();
    item.style.display = text.includes(filter) ? '' : 'none';
  });
});



//constants 
const playerList = document.getElementById("Player-List");
const playerForm = document.getElementById("playerForm");

//array to read info from
let CardArray = [];

// Load saved cards from localStorage on page load
window.addEventListener('DOMContentLoaded', () => {
  const saved = localStorage.getItem('CardArray');
  if (saved) {
    CardArray = JSON.parse(saved);
    autopopulateCards(CardArray);
  }
});

//add player button pressed
playerForm.addEventListener("submit", function(e) {
  e.preventDefault();

    //grab values from the fields
  const playerName = document.getElementById("Player_Name").value.trim();
  const rating = document.getElementById("Rating").value.trim();
  const imageInput = document.getElementById("Player_Image");

    //validity
  if (!playerName || !rating) return;

  //profile picture upload
  let imgSrc = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";
  if (imageInput.files && imageInput.files[0]) {
    imgSrc = URL.createObjectURL(imageInput.files[0]);
  }

  // Create a player object and add to CardArray
  const playerCard = {
    playerName,
    rating,
    imgSrc
  };

  CardArray.push(playerCard);

  // Save to localStorage
  localStorage.setItem('CardArray', JSON.stringify(CardArray));

  // Update the displayed list
  autopopulateCards(CardArray);

  // Reset the form
  playerForm.reset();
});

// Function to display cards
function autopopulateCards(cards,index) {
  playerList.innerHTML = "";  // Clear current cards
  //loop through array
  cards.forEach(card => {
    //make a card
    const div = document.createElement("div");
    //add the data to the card
    div.classList.add("player-card");

    //the format of the card
    div.innerHTML = `
      <img src="${card.imgSrc}" alt="${card.playerName}">
      <h3>${card.playerName}</h3>
      <p>Rating: ${card.rating}</p>
      <button class="delete-btn" data-index="${index}">Delete</button>    
      `;
    //put new card at the end of the list
    playerList.appendChild(div);
  });

  // make the button
  const deleteButtons = document.querySelectorAll('.delete-btn');
  //loop through each button
  deleteButtons.forEach(btn => 
    {
      //add a listener
      btn.addEventListener('click', (e) => {
      console.log("in del func")
      //get the index
      const idx = e.target.getAttribute('data-index');
      // Remove the card from the array
      CardArray.splice(idx, 1);
      // Save updated array to localStorage
      localStorage.setItem('CardArray', JSON.stringify(CardArray));
      // Re-render the list
      autopopulateCards(CardArray);
    });
  });
}


