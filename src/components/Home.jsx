import { useState } from "react";

const Home = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(`Username: ${username}, Password: ${password}`);
    };

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

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
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Home;
