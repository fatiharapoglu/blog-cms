import { useState } from "react";

import { login } from "../auth.js";

const Home = (props) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const user = await login(username, password);
            props.setUser(user);
        } catch (err) {
            props.handleSnackbar("Username or password is not correct.");
        }
    };

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    if (props.user?.token) return <h1 className="auth">Welcome back, Fettan!</h1>;

    return (
        <div className="home">
            <form onSubmit={handleSubmit}>
                <h3>Login to continue</h3>
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    onChange={handleUsernameChange}
                    value={username}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handlePasswordChange}
                    value={password}
                    required
                />
                <button className="btn" type="submit">
                    Login
                </button>
            </form>
        </div>
    );
};

export default Home;
