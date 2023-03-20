const login = async (username, password) => {
    const res = await fetch(`https://express-blog-api.cyclic.app/login`, {
        method: "POST",
        body: JSON.stringify({
            username,
            password,
        }),
        headers: {
            "Content-Type": "application/json",
        },
    });
    const data = await res.json();

    if (res.status === 401) throw new Error("Username or password is not correct.");

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
