export class Timer {
    private timerId?: number;
    private timeLeft: number;
    private readonly initialTime: number;
    private onTick: (time: number) => void;
    private onComplete: () => void;

    constructor(
        initialTime: number,
        onTick: (time: number) => void,
        onComplete: () => void
    ) {
        this.initialTime = initialTime;
        this.timeLeft = initialTime;
        this.onTick = onTick;
        this.onComplete = onComplete;
    }

    start(): void {
        this.timeLeft = this.initialTime;
        this.onTick(this.timeLeft);

        this.timerId = window.setInterval(() => {
            this.timeLeft--;
            this.onTick(this.timeLeft);

            if (this.timeLeft <= 0) {
                this.stop();
                this.onComplete();
            }
        }, 1000);
    }

    stop(): void {
        if (this.timerId) {
            clearInterval(this.timerId);
            this.timerId = undefined;
        }
    }

    reset(): void {
        this.stop();
        this.timeLeft = this.initialTime;
        this.onTick(this.timeLeft);
    }
}