import { AuthenticationResponse, UserInput } from "../types";
import User from "../model/user";
import userDb from "../repository/user.db"
import bcrypt from 'bcrypt';
import { generateJWTtoken } from "../util/jwt";

const getAllUsers = async (): Promise<User[]> => userDb.getAllUsers();

const getUserByUsername = async ({ username }: { username: string }): Promise<User> => {
    const foundUser = await userDb.getUserByUsername({ username });
    if (!foundUser) {
        throw new Error(`User with username ${username} doesn't exist.`);
    }
    return foundUser;
};

const createUser = async ({ firstName, lastName, birthDate, email, username, password }: UserInput): Promise<User> => {
    const existingUser = await getUserByUsername({ username });

    if (existingUser) {
        throw new Error(`User with username ${username} already exists.`);
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = new User({ firstName, lastName, birthDate, email, username, password: hashedPassword });

    return await userDb.createUser(newUser);

};

const authenticate = async ({ username, password }: { username: string, password: string }): Promise<AuthenticationResponse> => {
    const client = await getUserByUsername({ username });
    const isValidPassword = bcrypt.compare(password, client.getPassword());
    if (!isValidPassword) {
        throw new Error("Password is invalid");
    }
    const token = generateJWTtoken({ username: client.getUsername(), admin: client.getAdmin() });
    return {
        token: token,
        username: username,
        admin: client.getAdmin()
    }
}

const userService = {
    getUserByUsername,
    createUser,
    authenticate
};

export default userService;