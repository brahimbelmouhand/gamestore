type User = {
    firstName?: string,
    lastName?: string,
    birthDate?: Date,
    email?: string,
    username?: string,
    password: string,
    role?: string
};

type Client = {
    id?: number,
    user?: User
};

type Admin = {
    id?: number,
    user?: User
};

type Game = {
    id?: number,
    gameName: string,
    price: number,
    genres: string[],
    imageUrl: string
};

type Purchase = {
    id?: number,
    date: Date,
    game: Game,
    client: Client
};
