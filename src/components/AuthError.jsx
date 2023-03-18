import { Link } from "react-router-dom";

const AuthError = () => {
    return (
        <h1 className="auth">
            <Link to={"/blog-cms/"}>Please login to continue.</Link>
        </h1>
    );
};

export default AuthError;
