const login = async (username, password) => {
    const response = await fetch(`http://localhost:3000/login`, {
        method: "POST",
        body: JSON.stringify({
            username,
            password,
        }),
        headers: {
            "Content-Type": "application/json",
        },
    });
    const data = await response.json();

    if (data.token) {
        localStorage.setItem("user", JSON.stringify(data));
    }
    return data;
};

const logout = () => {
    localStorage.removeItem("user");
};

const isLoggedIn = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    return user;
};

export { login, logout, isLoggedIn };
