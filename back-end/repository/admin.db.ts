import Admin from "../model/admin";
import database from "./database";

const createAdmin = async (id: number) => {
    return await database.admin.create({
        data: {
            userId: id
        }
    })
}

const adminDb = {
    createAdmin
}

export default adminDb;