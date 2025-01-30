type Role = 'client' | 'admin';

type UserInput = {
    id?: number;
    firstName: string;
    lastName: string;
    birthDate: Date;
    email: string;
    username: string;
    password: string;
    role?: Role;
};

type ClientInput = {
    id?: number,
    user: UserInput
};

type AdminInput = {
    id?: number,
    user: UserInput
};

type AuthenticationResponse = {
    username: string,
    role: string,
    token: string
};

type GameInput = {
    id?: number,
    gamename: string,
    price: number,
    genres: string[],
    imageUrl: string
};

export { Role };
export { UserInput };
export { AdminInput };
export { ClientInput };
export { AuthenticationResponse };
export { GameInput };