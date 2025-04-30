const app = document.getElementById('app');

if (app) {
    app.innerHTML = `
        <div class="container">
            <div id="setup-screen">
                <div id="quiz-head">
                    <h1>Quiz Game</h1>
                </div>

                <div>
                    <label for="category">Category:</label>
                    <select id="category">
                        <option value="general">General Knowledge</option>
                        <option value="movie">Movies</option>
                        <option value="sport">Sports</option>
                    </select>
                </div>

                <div>
                    <label for="difficulty">Difficulty:</label>
                    <select id="difficulty">
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                    </select>
                </div>

                <button id="start-btn">Start Quiz</button>
            </div>

            <div id="quiz-screen" class="hidden">
                <h1 id="question-category"></h1>
                <div class="scores">
                    <div id="player1-score" class="player-score">Player 1: 0</div>
                    <div id="player2-score" class="player-score">Player 2: 0</div>
                </div>

                <div class="timer" id="timer">10</div>
                <h2 id="question-text">Question</h2>
                <div id="options-container"></div>
                <button id="next-btn" class="hidden">Next Question</button>
            </div>

            <div id="results-screen" class="hidden">
                <h1>Quiz Results</h1>
                <div class="leaderboard">
                    <table id="leaderboard-table">
                        <thead>
                            <tr>
                                <th>Player</th>
                                <th>Score</th>
                            </tr>
                        </thead>
                        <tbody></tbody>
                    </table>
                </div>
                <button id="restart-btn">Play Again</button>
            </div>
        </div>
    `;
}
