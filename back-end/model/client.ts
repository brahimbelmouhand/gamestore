import User from "./user";
import { Client as ClientPrisma, User as UserPrisma } from '@prisma/client';
class Client {
    private id?: number;
    private user: User;

    constructor(client: { id?: number, user: User }) {
        this.validate(client);
        this.id = client.id;
        this.user = client.user;
    }

    getId(): number | undefined {
        return this.id;
    }

    getUser(): User {
        return this.user;
    }

    validate(client: { user: User }) {
        if (!client.user) {
            throw new Error("User is required!");
        }
    }

    static from({
        id,
        user
    }: ClientPrisma & { user: UserPrisma }) {
        return new Client({
            id,
            user: User.from(user)
        })
    }
}
export default Client;