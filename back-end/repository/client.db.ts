import database from "./database";

const getClientWithUser = async (clientId: number) => {
    const clientWithUser = await database.client.findUnique({
        where: { id: clientId },
        include: { user: true, purchases: false }
    });

    if (!clientWithUser) {
        throw new Error("Client not found.")
    }
    return clientWithUser;
}

const clientDb = {
    getClientWithUser
}

export default clientDb;
