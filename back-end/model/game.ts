class Game {
    private id?: number;
    private name: string;
    private price: number;
    private genres: string[];

    constructor(game: { id?: number, name: string, price: number, genres: string[] }) {
        this.validate(game);

        this.id = game.id;
        this.name = game.name;
        this.price = game.price;
        this.genres = game.genres;
    }

    getName(): string {
        return this.name;
    }

    getPrice(): number {
        return this.price;
    }

    getGenres(): string[] {
        return this.genres;
    }

    validate(game: { name: string, price: number, genres: string[] }) {
        if (!game.name) {
            throw new Error("Name is required!");
        }
        if (!game.price) {
            throw new Error("Price is required!");
        }
    }
}

export default Game;