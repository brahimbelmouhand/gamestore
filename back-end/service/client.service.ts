import clientDb from "../repository/client.db"

const getClientWithUser = async (clientId: number) => {
    return await clientDb.getClientWithUser(clientId);
}

const clientService = {
    getClientWithUser
}

export default clientService;