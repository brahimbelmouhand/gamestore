type Role = 'client' | 'admin';

type UserInput = {
    id?: number;
    firstName: string;
    lastName: string;
    birthDate: Date;
    email: string;
    username: string;
    password: string;
    admin?: boolean;
};

type ClientInput = {
    id?: number,
    user?: UserInput
};

type AdminInput = {
    id?: number,
    user?: UserInput
};

export { Role };
export { UserInput };
export { AdminInput };
export { ClientInput };