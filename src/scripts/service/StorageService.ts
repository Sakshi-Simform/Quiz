import {GameState} from "../model"

export class StorageService {
    private static readonly STORAGE_KEY = 'quizGameState';

    saveGameState(state: GameState): void {
        localStorage.setItem(StorageService.STORAGE_KEY, JSON.stringify(state));
    }

    loadGameState(): GameState | null {
        const savedState = localStorage.getItem(StorageService.STORAGE_KEY);
        return savedState ? JSON.parse(savedState) : null;
    }

    clearGameState(): void {
        localStorage.removeItem(StorageService.STORAGE_KEY);
    }
}

