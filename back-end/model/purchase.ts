import Game from "./game";

class Purchase {
    private id?: number;
    private date: Date;
    private game: Game;

    constructor(purchase: { id?: number, date: Date, game: Game }) {
        this.validate(purchase);

        this.id = purchase.id;
        this.date = purchase.date;
        this.game = purchase.game;
    }

    getId(): number | undefined {
        return this.id;
    }

    getDate(): Date {
        return this.date;
    }

    getGame(): Game {
        return this.game;
    }

    validate(purchase: { date: Date, game: Game }) {
        if (!purchase.date) {
            throw new Error("Date is required!");
        }
        if (!purchase.game) {
            throw new Error("Game is required!");
        }
    }

}

export default Purchase;