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