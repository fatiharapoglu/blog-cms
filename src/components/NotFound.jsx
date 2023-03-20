import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div className="error">
            <h1>Page not found.</h1>
            <Link to={"/"}>Back to main page</Link>
        </div>
    );
};

export default NotFound;
