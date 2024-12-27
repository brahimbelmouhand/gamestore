import userDb from "../repository/user.db";
import User from "./user";
import { Admin as AdminPrisma, User as UserPrisma } from '@prisma/client';

class Admin {
    private id?: number;
    private user: User;

    constructor(admin: { id?: number, user: User }) {
        this.validate(admin);

        this.id = admin.id;
        this.user = admin.user;
    }

    getId(): number | undefined {
        return this.id;
    }

    getUser(): User {
        return this.user;
    }

    validate(admin: { user: User }) {
        if (!admin.user) {
            throw new Error("User is required!");
        }
    }

    static from({
        id,
        user
    }: AdminPrisma & { user: UserPrisma }) {
        return new Admin({
            id,
            user: User.from(user)
        })
    }
}

export default Admin;