import { GameState } from "./model";
import { QuestionService } from "./service/QuestionService";
import { StorageService } from "./service/StorageService";
import { QuizUI } from "./components/QuizUi";
import { Timer } from "./components/Timer";
import { Leaderboard } from "./components/Leaderboard";
import { Question } from "./model";

export class QuizGame {
    private questionService: QuestionService;
    private storageService: StorageService;
    private quizUI: QuizUI;
    private leaderboard: Leaderboard;
    private timer: Timer;
    private gameState!: GameState;
    private filteredQuestions: Question[] = [];

    constructor() {
        this.questionService = new QuestionService();
        this.storageService = new StorageService();
        this.quizUI = new QuizUI();
        this.leaderboard = new Leaderboard();
        
        this.timer = new Timer(
            10,
            (time) => this.quizUI.updateTimer(time),
            () => this.timeUp()
        );

        this.setupEventListeners();
        this.initializeUI();
        this.loadGameState();

        console.log('QuizGame initialized');
    }

    private initializeUI(): void {
        const categories = this.questionService.getCategories();
        const difficulties = this.questionService.getDifficulties();
        this.quizUI.populateCategorySelect(categories);
        this.quizUI.populateDifficultySelect(difficulties);
    }

    private setupEventListeners(): void {
        this.quizUI.bindStartButton(() => this.startGame());
        this.quizUI.bindNextButton(() => this.nextQuestion());
        this.quizUI.bindRestartButton(() => this.restartGame());
        this.quizUI.bindOptionClick((index) => this.selectAnswer(index));
    }

    private startGame(): void {
        const category = this.quizUI.getSelectedCategory();
        const difficulty = this.quizUI.getSelectedDifficulty();

        this.filteredQuestions = this.questionService.getQuestionsByCategoryAndDifficulty(category, difficulty);

        this.gameState = {
            currentQuestionIndex: 0,
            player1Score: 0,
            player2Score: 0,
            activePlayer: 1,
            timeLeft: 10,
            category,
            difficulty
        };

        this.storageService.saveGameState(this.gameState);
        this.quizUI.showQuizScreen();
        this.displayCurrentQuestion();
    }

    private displayCurrentQuestion(): void {
        const currentQuestion = this.getCurrentQuestion();
        if (!currentQuestion) {
            this.endGame();
            return;
        }

        this.quizUI.displayQuestion(currentQuestion);
        this.quizUI.updateActivePlayer(this.gameState.activePlayer);
        this.quizUI.updateScores(this.gameState.player1Score, this.gameState.player2Score);
        this.quizUI.hideNextButton();
        this.timer.reset();
        this.timer.start();
    }

    private getCurrentQuestion(): Question | null {
        if (this.gameState.currentQuestionIndex < this.filteredQuestions.length) {
            return this.filteredQuestions[this.gameState.currentQuestionIndex];
        }
        return null;
    }

    private selectAnswer(selectedIndex: number): void {
        const currentQuestion = this.getCurrentQuestion();
        if (!currentQuestion) return;

        this.timer.stop();

        this.quizUI.highlightAnswer(selectedIndex, currentQuestion.correctAnswer);

        if (selectedIndex === currentQuestion.correctAnswer) {
            if (this.gameState.activePlayer === 1) {
                this.gameState.player1Score++;
            } else {
                this.gameState.player2Score++;
            }
            this.quizUI.updateScores(this.gameState.player1Score, this.gameState.player2Score);
        }

        this.storageService.saveGameState(this.gameState);
        this.quizUI.showNextButton();
    }

    private timeUp(): void {
        const currentQuestion = this.getCurrentQuestion();
        if (!currentQuestion) return;

        this.quizUI.highlightAnswer(-1, currentQuestion.correctAnswer);
        this.quizUI.showNextButton();
    }

    private nextQuestion(): void {
        this.gameState.activePlayer = this.gameState.activePlayer === 1 ? 2 : 1;
        this.gameState.currentQuestionIndex++;
        this.storageService.saveGameState(this.gameState);

        this.displayCurrentQuestion();
    }

    private endGame(): void {
        this.leaderboard.displayResults(this.gameState.player1Score, this.gameState.player2Score);
        this.quizUI.showResultsScreen();
        this.storageService.clearGameState();
    }

    private loadGameState(): void {
        const savedState = this.storageService.loadGameState();
        if (savedState) {
            if (confirm('Do you want to resume your previous game?')) {
                this.gameState = savedState;
                this.filteredQuestions = this.questionService.getQuestionsByCategoryAndDifficulty(
                    this.gameState.category,
                    this.gameState.difficulty
                );
                this.quizUI.showQuizScreen();
                this.displayCurrentQuestion();
            } else {
                this.storageService.clearGameState();
            }
        }
    }

    private restartGame(): void {
        this.storageService.clearGameState();
        this.quizUI.showSetupScreen();
    }
}