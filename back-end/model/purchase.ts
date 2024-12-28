import Game from "./game";

class Purchase {
    private id?: number;
    private date: Date;
    private game: Game;

    constructor(purchase: { id?: number, date: Date, game: Game }) {
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

}

export default Purchase;