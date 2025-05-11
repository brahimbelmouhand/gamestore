import database from './database';
import User from '../model/user';

const getAllUsers = async (): Promise<User[]> => {
    try {
        const usersPrisma = await database.user.findMany();
        return usersPrisma.map((userPrisma) => User.from(userPrisma));
    }
    catch (error) {
        console.error(error);
        throw new Error("Database error. See server log for details.");
    }
}

const getUserById = async ({ id }: { id: number }): Promise<User | null> => {
    try {
        const userPrisma = await database.user.findUnique({
            where: { id }
        })
        return userPrisma ? User.from(userPrisma) : null
    }
    catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
}

const getUserByUsername = async ({ username }: { username: string }): Promise<User | null> => {
    try {
        const userPrisma = await database.user.findUnique({
            where: { username }
        });

        return userPrisma ? User.from(userPrisma) : null;
    }
    catch (error) {
        console.error(error);
        throw new Error("Database error. See server log for details.");
    }
}

const createUser = async (user: User): Promise<User> => {
    try {
        const userPrisma = await database.user.create({
            data: {
                firstName: user.getFirstName(),
                lastName: user.getLastName(),
                birthDate: user.getBirthDate(),
                email: user.getEmail(),
                username: user.getUsername(),
                password: user.getPassword()
            },
        })

        return User.from(userPrisma)
    }
    catch (error) {
        console.error(error);
        throw new Error("Database error. See server log for details.")
    }
}

const deleteUser = async (user: User) => {
    try {
        const userPrisma = await database.user.delete({
            where: {
                id: user.getId()
            }
        })

        return User.from(userPrisma);
    }
    catch (error) {
        console.error(error);
        throw new Error("Database error. See server log for details.");
    }
}
const userDb = {
    getAllUsers,
    getUserById,
    getUserByUsername,
    createUser,
    deleteUser
}

export default userDb;