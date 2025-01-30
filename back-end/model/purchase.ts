import Client from "./client";
import Game from "./game";
import { Purchase as PurchasePrisma, Game as GamePrisma, Client as ClientPrisma, User as UserPrisma } from "@prisma/client";
class Purchase {
    private id?: number;
    private date: Date;
    private game: Game;
    private client: Client;

    constructor(purchase: { id?: number, date: Date, game: Game, client: Client }) {
        this.validate(purchase);

        this.id = purchase.id;
        this.date = purchase.date;
        this.game = purchase.game;
        this.client = purchase.client;
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

    getClient(): Client {
        return this.client;
    }

    validate(purchase: { date: Date, game: Game, client: Client }) {
        if (!purchase.date) {
            throw new Error("Date is required!");
        }
        if (!purchase.game) {
            throw new Error("Game is required!");
        }
        if (purchase.client) {
            throw new Error("Client is required!");
        }
    }

    static from({
        id,
        date,
        game,
        client
    }: PurchasePrisma & {
        game: GamePrisma;
        client: ClientPrisma & {
            user: UserPrisma
        }
    }): Purchase {
        return new Purchase({
            id,
            date,
            game: Game.from(game),
            client: Client.from(client)
        })
    };
}

export default Purchase;