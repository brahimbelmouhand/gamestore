import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt';
import adminDb from "../repository/admin.db";
const prisma = new PrismaClient();

const main = async () => {
    await prisma.admin.deleteMany();
    await prisma.client.deleteMany();
    await prisma.user.deleteMany();
    await prisma.game.deleteMany();
    await prisma.purchase.deleteMany();

    const adminUser = await prisma.user.create({
        data: {
            id: 2,
            firstName: "Admin",
            lastName: "Admin",
            birthDate: new Date("2005-11-23"),
            username: "admin",
            email: "admin@gamewebsite.com",
            password: await bcrypt.hash('admin', 12),
            role: "admin"
        }
    });

    const admin = await prisma.admin.create({
        data: {
            id: 2,
            userId: 2
        }
    })


    const userBrahim = await prisma.user.create({
        data: {
            id: 1,
            firstName: "Brahim",
            lastName: "Belmouhand",
            birthDate: new Date("2004-11-23"),
            username: "codegeek",
            email: "brahim003@outlook.com",
            password: await bcrypt.hash('rizz', 12),
            role: "client"
        }
    })

    const brahim = await prisma.client.create({
        data: {
            id: 1,
            userId: 1
        }
    })

    const squidgame = await prisma.game.create({
        data: {
            gameName: "Squid Game: a fight for survival",
            price: 29.99,
            genres: ["Horror", "Action"],
            imageUrl: "/image/game/squidgame.jpeg"
        }
    });


    const tombraider =
        await prisma.game.create({
            data: {
                gameName: "Tomb raider",
                price: 39.99,
                genres: ["Adventure"],
                imageUrl: "/image/game/tombraider.jpeg"
            }
        });


    const baldursgate =
        await prisma.game.create({
            data: {
                gameName: "Baldur's Gate 3",
                price: 49.99,
                genres: ["RPG"],
                imageUrl: "/image/game/baldursgate.jpeg"
            }
        });


    const crusaderkings =
        await prisma.game.create({
            data: {
                gameName: "Crusader Kings III",
                price: 19.99,
                genres: ["Strategy"],
                imageUrl: "/image/game/crusaderkings.jpeg"
            }
        });


    const game5 =
        await prisma.game.create({
            data: {
                gameName: "Game 5",
                price: 24.99,
                genres: ["Simulation"],
                imageUrl: "/svg/game/default.svg"
            }
        });


    const game6 =
        await prisma.game.create({
            data: {
                gameName: "Game 6",
                price: 34.99,
                genres: ["Puzzle"],
                imageUrl: "/svg/game/default.svg"
            }
        });


    const eafc25 =
        await prisma.game.create({
            data: {
                gameName: "EA FC 25",
                price: 44.99,
                genres: ["Sports"],
                imageUrl: "/image/game/eafc25.jpeg"
            }
        });


    const nfs =
        await prisma.game.create({
            data: {
                gameName: "Need For Speed: Most Wanted",
                price: 54.99,
                genres: ["Racing"],
                imageUrl: "/image/game/nfs.jpeg"
            }
        });

    const tekken =
        await prisma.game.create({
            data: {
                gameName: "Tekken 8",
                price: 64.99,
                genres: ["Fighting"],
                imageUrl: "/image/game/tekken.jpeg"
            }
        });


    const phasmophobia =
        await prisma.game.create({
            data: {
                gameName: "Phasmophobia",
                price: 74.99,
                genres: ["Horror"],
                imageUrl: "/image/game/phasmophobia.jpeg"
            }
        });
}

(async () => {
    try {
        await main();
        await prisma.$disconnect();
    } catch (error) {
        console.error(error);
        await prisma.$disconnect();
        process.exit(1);
    }
})();