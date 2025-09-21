
const playerList = document.getElementById("Player-List");
const playerForm = document.getElementById("playerForm");


playerForm.addEventListener("submit", function(e) {
    e.preventDefault();

    
    const playerName = document.getElementById("Player Name").value.trim();
    const rating = document.getElementById("Rating").value.trim();
    const imageInput = document.getElementById("Player Image");

    if (!playerName || !rating) return;

    
    const card = document.createElement("div");
    card.classList.add("player-card");

    
    let imgSrc = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";
    if (imageInput.files && imageInput.files[0]) {
        imgSrc = URL.createObjectURL(imageInput.files[0]);
    }

    card.innerHTML = `
        <img src="${imgSrc}" alt="${playerName}">
        <h3>${playerName}</h3>
        <p>Rating: ${rating}</p>
    `;
    
    playerList.appendChild(card);

    playerForm.reset();
});
