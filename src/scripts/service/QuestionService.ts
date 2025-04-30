import { Question } from "../model";

export class QuestionService {
    private questions: Question[] = [
       // General - Easy
       {
        text: "What is the capital of France?",
        options: ["Berlin", "Madrid", "Paris", "Rome"],
        correctAnswer: 2,
        category: "general",
        difficulty: "easy"
    },
    {
        text: "Which planet is known as the Red Planet?",
        options: ["Venus", "Mars", "Jupiter", "Saturn"],
        correctAnswer: 1,
        category: "general",
        difficulty: "easy"
    },
    // General - Medium
    {
        text: "Who painted the Mona Lisa?",
        options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Michelangelo"],
        correctAnswer: 2,
        category: "general",
        difficulty: "medium"
    },
    // General - Hard
    {
        text: "In which year did the Titanic sink?",
        options: ["1905", "1912", "1918", "1923"],
        correctAnswer: 1,
        category: "general",
        difficulty: "hard"
    },
    // Movie - Easy
    {
        text: "Which actress played the lead role in the 2022 film 'Gangubai Kathiawadi'?",
        options: ["Kangana Ranaut", "Deepika Padukone", "Alia Bhatt", "Kriti Sanon"],
        correctAnswer: 2,
        category: "movie",
        difficulty: "easy"
    },
    // Movie - Medium
    {
        text: "Which actor played the lead role in the 2023 film 'Mission Raniganj'?",
        options: ["Akshay kumar", "Ranbir Kapoor", "Varun Dhawan", "Aditya Roy Kapoor"],
        correctAnswer: 0,
        category: "movie",
        difficulty: "medium"
    },
    // Movie - Hard
    {
        text: "Which film won Best Film at the 2024 Filmfare Awards?",
        options: ["Jawan", "Animal", "12th Fail", "Rocky Aur Rani Ki Prem Kahani"],
        correctAnswer: 2,
        category: "movie",
        difficulty: "hard"
    },
    // Sports - Easy
    {
        text: "Who won the FIFA World Cup in 2022?",
        options: ["France", "Argentina", "Brazil", "Croatia"],
        correctAnswer: 1,
        category: "sports",
        difficulty: "easy"
    },
    // Sports - Medium
    {
        text: "Which country won the ICC Cricket World Cup 2023?",
        options: ["India", "Australia", "England", "New Zealand"],
        correctAnswer: 1,
        category: "sports",
        difficulty: "medium"
    },
    // Sports - Hard
    {
        text: "Who scored the fastest double century in ODIs as of 2025?",
        options: ["Ishan Kishan", "Shubman Gill", "Fakhar Zaman", "Chris Gayle"],
        correctAnswer: 1,
        category: "sports",
        difficulty: "hard"
    }
        
    ];

    getQuestionsByCategoryAndDifficulty(category: string, difficulty: string): Question[] {
        return this.questions.filter(q => 
            q.category === category && 
            q.difficulty === difficulty
        );
    }

    getCategories(): string[] {
        return [...new Set(this.questions.map(q => q.category))];
    }

    getDifficulties(): string[] {
        return [...new Set(this.questions.map(q => q.difficulty))];
    }
}