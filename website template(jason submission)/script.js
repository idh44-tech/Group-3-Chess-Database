const itemData = {
  "person 1": {
    name: "person 1",
    elo: "1000",
    white_win_rate: "40%",
    black_win_rate: "60%",
  },
  "person 2": {
    name: "person 2",
    elo: "2000",
    white_win_rate: "75%",
    black_win_rate: "45%",
  },
  "person 3": {
    name: "person 3",
    elo: "500",
    white_win_rate: "50%",
    black_win_rate: "30%",
  },
};

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
