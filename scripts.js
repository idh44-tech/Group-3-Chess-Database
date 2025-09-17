// Leaderboard script
    // Fetch player data from json file, sort by Elo (top to bottom), and fill leaderboard table
window.addEventListener('DOMContentLoaded', function() {
    fetch('PlayerStats.json')
        .then(response => response.json())
        .then(players => {
            // Clears previous table and sorts players by Elo (top to bottom)
            players.sort((a, b) => b.Elo - a.Elo);
            const table = document.querySelector('table');
            const tbody = table.querySelector('tbody');
            tbody.innerHTML = '';

            // Fill leaderboard table
            players.forEach((player, i) => {
                // Table row
                const tr = document.createElement('tr');

                // Rank
                const tdRank = document.createElement('td');
                tdRank.textContent = i + 1;
                tr.appendChild(tdRank);

                // Name
                const tdName = document.createElement('td');
                const a = document.createElement('a');
                a.href = player.Link;
                a.textContent = player.Name;
                tdName.appendChild(a);
                tr.appendChild(tdName);

                // ID
                const tdID = document.createElement('td');
                tdID.textContent = player.ID;
                tr.appendChild(tdID);

                // Elo
                const tdElo = document.createElement('td');
                tdElo.textContent = player.Elo;
                tr.appendChild(tdElo);
                tbody.appendChild(tr);
            });
        })
        .catch(error => {
            console.error('Error loading player data:', error);
        });
});
