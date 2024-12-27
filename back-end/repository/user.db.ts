import database from './database';
import User from '../model/user';

const getUserByUsername = async ({ username }: { username: string }) => {
    try {
        const userPrisma = await database.user.findUnique({
            where: { username }
        });

        return userPrisma ? User.from(userPrisma) : null
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

const userDb = {
    getUserByUsername,
    createUser
}

export default userDb;