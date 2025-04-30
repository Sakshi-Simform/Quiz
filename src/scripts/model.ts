//Question 
export interface Question {
    text: string;
    options: string[];
    correctAnswer: number;
    category: string;
    difficulty: string;
}

// Game state 
export interface GameState {
    currentQuestionIndex: number;
    player1Score: number;
    player2Score: number;
    activePlayer: 1 | 2;
    timeLeft: number;
    category: string;
    difficulty: string;
    timerId?: number;
}