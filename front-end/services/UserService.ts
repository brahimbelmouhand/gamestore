const registerUser = (user: User) => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + "/user/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    });
}

const loginUser = async (user: User) => {
    return await fetch(process.env.NEXT_PUBLIC_API_URL + "/user/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    });
}

const deleteUser = async (username: string) => {
    return await fetch(process.env.NEXT_PUBLIC_API_URL + "/delete/" + username, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    });
}

const fetchWithToken = (url: string, options: RequestInit = {}) => {
    const token = localStorage.getItem("loggedInUser") ? JSON.parse(localStorage.getItem("loggedInUser")!).token : null;

    if (token) {
        options.headers = {
            ...options.headers,
            "Authorization": `Bearer ${token}`
        };
    }

    return fetch(url, options);
};

const UserService = {
    registerUser,
    loginUser,
    deleteUser,
    fetchWithToken
};

export default UserService;