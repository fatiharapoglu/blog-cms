import { useState } from "react";

import { login } from "../auth.js";
import Loading from "./Loading";

const Home = (props) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const user = await login(username, password);
            props.setUser(user);
            setIsLoading(false);
        } catch (err) {
            props.handleSnackbar("Username or password is not correct.");
            setIsLoading(false);
        }
    };

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    if (props.user?.token) return <h1 className="auth">Welcome back, Fettan!</h1>;
    if (isLoading) return <Loading />;

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
