export class Leaderboard {
    private leaderboardTable: HTMLTableElement;

    constructor() {
        this.leaderboardTable = document.getElementById('leaderboard-table') as HTMLTableElement;
    }

    displayResults(player1Score: number, player2Score: number): void {
        const tbody = this.leaderboardTable.querySelector('tbody') as HTMLTableSectionElement;
        tbody.innerHTML = '';

        const players = [
            { name: 'Player 1', score: player1Score },
            { name: 'Player 2', score: player2Score }
        ];

        players.sort((a, b) => b.score - a.score);

        players.forEach(player => {
            const row = document.createElement('tr');
            const nameCell = document.createElement('td');
            const scoreCell = document.createElement('td');

            nameCell.textContent = player.name;
            scoreCell.textContent = player.score.toString();

            row.appendChild(nameCell);
            row.appendChild(scoreCell);
            tbody.appendChild(row);
        });
    }
}