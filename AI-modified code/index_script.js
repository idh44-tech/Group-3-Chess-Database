let playerList;
let playerForm;

let CardArray = [];

window.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await fetch("players.json");
    if (response.ok) {
      const jsonData = await response.json();

      if (!localStorage.getItem("CardArray")) {
        CardArray = jsonData;
        localStorage.setItem("CardArray", JSON.stringify(jsonData));
      }
    }
  } catch (error) {
    console.log("players.json could not be loaded.");
  }

  const saved = localStorage.getItem("CardArray");
  if (saved) {
    CardArray = JSON.parse(saved);
    autopopulateCards(CardArray);
  }

  main();
});

function main() {
  playerList = document.getElementById("player-list");
  playerForm = document.getElementById("playerForm");

  if (!playerForm) return;
  playerForm.addEventListener("submit", addPlayer);
}

function addPlayer(e) {
  e.preventDefault();

  const playerName = document.getElementById("playerName").value.trim();
  const rating = document.getElementById("rating").value.trim();
  const imageInput = document.getElementById("playerImage");

  if (!playerName || !rating) return false;

  if (isNaN(rating) || rating < 0 || rating > 4000) {
    alert("Please enter a valid rating (0–4000).");
    return false;
  }

  let imgSrc =
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";

  if (imageInput.files && imageInput.files[0]) {
    imgSrc = URL.createObjectURL(imageInput.files[0]);
  }

  const playerCard = {
    playerName,
    rating: Number(rating),
    imgSrc,
  };

  CardArray.push(playerCard);
  CardArray.sort((a, b) => b.rating - a.rating);

  localStorage.setItem("CardArray", JSON.stringify(CardArray));
  autopopulateCards(CardArray);

  playerForm.reset();
  return true;
}

function autopopulateCards(cards) {
  playerList.innerHTML = "";

  cards.forEach((card, i) => {
    const div = document.createElement("div");
    div.classList.add("player-card");

    div.innerHTML = `
      <img src="${card.imgSrc}" alt="${card.playerName}">
      <h3>${card.playerName}</h3>
      <p>Rating: ${card.rating}</p>
      <button class="delete-btn" data-index="${i}">Delete</button>
    `;

    playerList.appendChild(div);
  });

  const deleteButtons = document.querySelectorAll(".delete-btn");
  deleteButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const idx = e.target.getAttribute("data-index");
      CardArray.splice(idx, 1);
      localStorage.setItem("CardArray", JSON.stringify(CardArray));
      autopopulateCards(CardArray);
    });
  });
}
