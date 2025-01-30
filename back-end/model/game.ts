import { Game as GamePrisma } from '@prisma/client';
class Game {
    private id?: number;
    private gameName: string;
    private price: number;
    private genres: string[];
    private imageUrl: string;

    constructor(game: { id?: number, gameName: string, price: number, genres: string[], imageUrl?: string }) {
        this.validate(game);

        this.id = game.id;
        this.gameName = game.gameName;
        this.price = game.price;
        this.genres = game.genres;
        this.imageUrl = game.imageUrl || '/svg/game/default.svg';
    }

    getId(): number | undefined {
        return this.id;
    }

    getName(): string {
        return this.gameName;
    }

    getPrice(): number {
        return this.price;
    }

    getGenres(): string[] {
        return this.genres;
    }

    getImageUrl(): string {
        return this.imageUrl;
    }

    validate(game: { gameName: string, price: number, genres: string[], imageUrl?: string }) {
        if (!game.gameName) {
            throw new Error("Name is required!");
        }
        if (!game.price) {
            throw new Error("Price is required!");
        }

    }

    static from({
        id,
        gameName,
        price,
        genres,
        imageUrl
    }: GamePrisma): Game {
        return new Game({
            id,
            gameName,
            genres,
            price,
            imageUrl
        });
    }

}

export default Game;