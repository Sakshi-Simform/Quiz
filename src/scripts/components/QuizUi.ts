import { Question, GameState } from "../model";

export class QuizUI {
    private setupScreen!: HTMLElement;
    private quizScreen!: HTMLElement;
    private resultsScreen!: HTMLElement;
    private questionText!: HTMLElement;
    private optionsContainer!: HTMLElement;
    private timerElement!: HTMLElement;
    private player1ScoreElement!: HTMLElement;
    private player2ScoreElement!: HTMLElement;
    private nextButton!: HTMLElement;
    private startButton!: HTMLElement;
    private restartButton!: HTMLElement;
    private categorySelect!: HTMLSelectElement;
    private difficultySelect!: HTMLSelectElement;
    private questionCategoryElement!: HTMLElement;

    constructor() {
        this.setupElements();
    }

    private setupElements(): void {
        this.setupScreen = document.getElementById('setup-screen') as HTMLElement;
        this.quizScreen = document.getElementById('quiz-screen') as HTMLElement;
        this.resultsScreen = document.getElementById('results-screen') as HTMLElement;
        this.questionText = document.getElementById('question-text') as HTMLElement;
        this.optionsContainer = document.getElementById('options-container') as HTMLElement;
        this.timerElement = document.getElementById('timer') as HTMLElement;
        this.player1ScoreElement = document.getElementById('player1-score') as HTMLElement;
        this.player2ScoreElement = document.getElementById('player2-score') as HTMLElement;
        this.nextButton = document.getElementById('next-btn') as HTMLElement;
        this.startButton = document.getElementById('start-btn') as HTMLElement;
        this.restartButton = document.getElementById('restart-btn') as HTMLElement;
        this.categorySelect = document.getElementById('category') as HTMLSelectElement;
        this.difficultySelect = document.getElementById('difficulty') as HTMLSelectElement;
        this.questionCategoryElement = document.getElementById('question-category') as HTMLElement;
    }

    showSetupScreen(): void {
        this.setupScreen.classList.remove('hidden');
        this.quizScreen.classList.add('hidden');
        this.resultsScreen.classList.add('hidden');
    }

    showQuizScreen(): void {
        this.setupScreen.classList.add('hidden');
        this.quizScreen.classList.remove('hidden');
        this.resultsScreen.classList.add('hidden');
    }

    showResultsScreen(): void {
        this.setupScreen.classList.add('hidden');
        this.quizScreen.classList.add('hidden');
        this.resultsScreen.classList.remove('hidden');
    }

    displayQuestion(question: Question): void {
        if (!question) return;

        this.questionText.textContent = question.text;
        this.questionCategoryElement.textContent = `${question.category} (${question.difficulty})`;
        this.optionsContainer.innerHTML = '';

        question.options.forEach((option, index) => {
            const optionElement = document.createElement('div');
            optionElement.classList.add('option');
            optionElement.textContent = option;
            optionElement.dataset.index = index.toString();
            this.optionsContainer.appendChild(optionElement);
        });
    }

    updateTimer(time: number): void {
        this.timerElement.textContent = time.toString();
    }

    updateScores(player1Score: number, player2Score: number): void {
        this.player1ScoreElement.textContent = `Player 1: ${player1Score}`;
        this.player2ScoreElement.textContent = `Player 2: ${player2Score}`;
    }

    updateActivePlayer(activePlayer: 1 | 2): void {
        if (activePlayer === 1) {
            this.player1ScoreElement.classList.add('active-player');
            this.player2ScoreElement.classList.remove('active-player');
        } else {
            this.player1ScoreElement.classList.remove('active-player');
            this.player2ScoreElement.classList.add('active-player');
        }
    }

    showNextButton(): void {
        this.nextButton.classList.remove('hidden');
    }

    hideNextButton(): void {
        this.nextButton.classList.add('hidden');
    }

    highlightAnswer(selectedIndex: number, correctIndex: number): void {
        const options = this.optionsContainer.querySelectorAll('.option');
        options.forEach((option, index) => {
            if (index === correctIndex) {
                option.classList.add('correct');
            } else if (index === selectedIndex && index !== correctIndex) {
                option.classList.add('incorrect');
            }
        });
    }

    populateCategorySelect(categories: string[]): void {
        if (!categories || categories.length === 0) return;

        this.categorySelect.innerHTML = '';
        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category;
            option.textContent = category.charAt(0).toUpperCase() + category.slice(1);
            this.categorySelect.appendChild(option);
        });
    }

    populateDifficultySelect(difficulties: string[]): void {
        if (!difficulties || difficulties.length === 0) return;

        this.difficultySelect.innerHTML = '';
        difficulties.forEach(difficulty => {
            const option = document.createElement('option');
            option.value = difficulty;
            option.textContent = difficulty.charAt(0).toUpperCase() + difficulty.slice(1);
            this.difficultySelect.appendChild(option);
        });
    }

    getSelectedCategory(): string {
        return this.categorySelect ? this.categorySelect.value : '';
    }

    getSelectedDifficulty(): string {
        return this.difficultySelect ? this.difficultySelect.value : '';
    }

    bindStartButton(handler: () => void): void {

        this.startButton.addEventListener('click', handler);
    }

    bindNextButton(handler: () => void): void {
        this.nextButton.addEventListener('click', handler);
    }

    bindRestartButton(handler: () => void): void {
        this.restartButton.addEventListener('click', handler);
    }

    bindOptionClick(handler: (index: number) => void): void {
        this.optionsContainer.addEventListener('click', (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            
        });
    }
}