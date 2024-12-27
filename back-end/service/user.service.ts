import { UserInput } from "../types";
import User from "../model/user";
import userDb from "../repository/user.db"
import bcrypt from 'bcrypt';

const getUserByUsername = async ({ username }: { username: string }) => {
    const foundUser = await userDb.getUserByUsername({ username });
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


const userService = {
    getUserByUsername,
    createUser
};

export default userService;