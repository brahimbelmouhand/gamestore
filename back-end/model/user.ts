import { User as UserPrisma } from "@prisma/client";

class User {
    private id?: number;
    private firstName: string;
    private lastName: string;
    private birthDate: Date;
    private email: string;
    private username: string;
    private password: string;
    private admin = false;

    constructor(user: { id?: number, firstName: string, lastName: string, birthDate: Date, email: string, username: string, password: string }) {
        this.validate(user);

        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.birthDate = user.birthDate;
        this.email = user.email;
        this.username = user.username;
        this.password = user.password;
    }

    getId(): number | undefined {
        return this.id;
    }

    getFirstName(): string {
        return this.firstName;
    }

    getLastName(): string {
        return this.lastName;
    }

    getBirthDate(): Date {
        return this.birthDate;
    }
    getEmail(): string {
        return this.email;
    }
    getUsername(): string {
        return this.username;
    }

    getPassword(): string {
        return this.password;
    }

    getAdmin(): boolean {
        return this.admin;
    }

    validate(user: { firstName: string, lastName: string, birthDate: Date, email: string, username: string, password: string }) {
        if (!user.firstName.trim()) {
            throw new Error("First name is required!")
        }
        if (!user.lastName.trim()) {
            throw new Error("Last name is required!")
        }
        if (!user.birthDate) {
            throw new Error("Birth date is required!")
        }
        if (!user.email) {
            throw new Error("Email is required.")
        }
        if (!new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/).test(user.email)) {
            throw new Error("Entered email is invalid.");
        }
        if (!user.username.trim()) {
            throw new Error("Username is required!")
        }
        if (!user.password.trim()) {
            throw new Error("Password is required!")
        }
    }

    static from({
        id,
        firstName,
        lastName,
        birthDate,
        email,
        username,
        password
    }: UserPrisma) {
        return new User({
            id,
            firstName,
            lastName,
            birthDate,
            email,
            username,
            password
        })
    }
}

export default User;