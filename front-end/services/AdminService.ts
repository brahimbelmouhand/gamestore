import { stringify } from "querystring";
import UserService from "./UserService";

const registerAdmin = async (user: User) => {
    try {
        await UserService.registerUser(user);
        return await fetch(process.env.NEXT_PUBLIC_API_URL + `/admin/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user.username)
        })
    }
    catch (console) {
        throw new Error("Failed to fetch data from back-end.")
    }
}


const AdminService = {
    registerAdmin
};

export default AdminService;