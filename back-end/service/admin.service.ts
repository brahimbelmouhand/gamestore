import Admin from "../model/admin";
import adminDb from "../repository/admin.db";
import userDb from "../repository/user.db";

const createAdmin = async (username: string) => {
    try {
        const user = await userDb.getUserByUsername({ username });
        if (user?.getId() !== undefined) {
            const userId = user.getId();
            if (userId !== undefined) {
                return await adminDb.createAdmin(userId);
            }
            throw new Error("User ID is undefined");
        }
        throw new Error("User ID is undefined");
    }
    catch (error) {
        throw new Error('Error creating an admin')
    }
}

const adminService = {
    createAdmin
}

export default adminService;