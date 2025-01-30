import Game from "./game";
import Purchase from "./purchase";

class GamePurchase {
    private id?: number;
    private games: Game[];
    private purchases: Purchase[];

    constructor(gamePurchase: { id?: number, games: Game[], purchases: Purchase[] }) {
        this.id = gamePurchase.id;
        this.games = gamePurchase.games;
        this.purchases = gamePurchase.purchases;
    }

    static from() {

    }
}