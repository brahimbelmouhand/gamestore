import Game from "../model/game";
import database from "./database";

const getAllGames = async () => {
    try {
        const gamesPrisma = await database.game.findMany({
            include: {
                purchases: false
            }
        });
        return gamesPrisma.map((gamePrisma) => Game.from(gamePrisma));
    }
    catch (error) {
        console.error(error);
        throw new Error("Database error. See server log for details.");
    }
}
const gameDb = {
    getAllGames
}

export default gameDb;