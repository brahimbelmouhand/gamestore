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

const createUser = async ({ firstName, lastName, birthDate, email, username, password, role }: UserInput): Promise<User> => {
    const existingUser = await getUserByUsername({ username });

    if (existingUser) {
        throw new Error(`User with username ${username} already exists.`);
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = new User({ firstName, lastName, birthDate, email, username, password: hashedPassword, role: "client" });

    return await userDb.createUser(newUser);

};

const deleteUser = async ({ username }: { username: string }) => {
    const deletingUser = await getUserByUsername({ username: username })
    if (deletingUser) {
        return await userDb.deleteUser(deletingUser);
    }
    throw new Error(`Cannot delete user ${username}`);
}

const authenticate = async ({ username, password }: { username: string, password: string }): Promise<AuthenticationResponse> => {
    const user = await getUserByUsername({ username });
    const isValidPassword = bcrypt.compare(password, user.getPassword());
    if (!isValidPassword) {
        throw new Error("Password is invalid");
    }
    const token = generateJWTtoken({ username: user.getUsername(), role: user.getRole() });
    return {
        token: token,
        username: username,
        role: user.getRole()
    }
}

const userService = {
    getUserByUsername,
    createUser,
    deleteUser,
    authenticate
};

export default userService;