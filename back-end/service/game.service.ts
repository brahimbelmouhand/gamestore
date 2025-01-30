import Game from "../model/game";
import gameDb from "../repository/game.db";

const getAllGames = async (): Promise<Game[]> => {
    const games = await gameDb.getAllGames();
    return games;
};

const gameService = {
    getAllGames
};

export default gameService;