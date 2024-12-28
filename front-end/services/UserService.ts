const registerUser = async (user: User) => {
    try {
        const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/user/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        });
        if (response.ok) {
            const data = response.json();
            return data;
        }
    }
    catch (error) {
        console.error("Failed to fetch data from back-end server: ", error);
    }
}

const loginUser = async (user: User) => {
    try {
        const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/user/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        });
    }
    catch (error) {

    }
}

const UserService = {
    registerUser,
    loginUser
};

export default UserService;