const getAllPurchasesByUser = async (user: User) => {
    try {
        const response = await fetch(process.env.NEXT_PUBLIC_API_URL + `/purchase/${user}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            const data = response.json();
            return data;
        }
    }
    catch (error) {
        throw new Error("Unable to fetch data from back-end server.");
    }
}

const purchaseService = [
    getAllPurchasesByUser
]

export default purchaseService;