import { Link, NavLink } from "react-router-dom";

import logo from "../assets/favicon.png";
import { logout } from "../auth";

const Header = (props) => {
    const handleLogOut = () => {
        logout();
        props.setUser(null);
    };

    return (
        <nav className="header">
            <div>
                <Link to="/blog-cms/">
                    <img src={logo} alt="logo" />
                </Link>
                <span className="name">
                    Quill <span>&</span> Verse
                </span>
                <span className="slogan"> Poetry and Prose</span>
            </div>
            <div>
                <ul className="nav-links">
                    <li>
                        <NavLink to="/blog-cms/">Home</NavLink>
                    </li>
                    {props.user?.token && (
                        <>
                            <li>
                                <NavLink to="/blog-cms/new">New Post</NavLink>
                            </li>
                            <li>
                                <NavLink to="/blog-cms/all">All Posts</NavLink>
                            </li>
                            <li>
                                <NavLink to="/blog-cms/published">Published</NavLink>
                            </li>
                            <li>
                                <NavLink to="/blog-cms/unpublished">Unpublished</NavLink>
                            </li>
                            <li>
                                <button className="btn" onClick={handleLogOut}>
                                    Log Out
                                </button>
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </nav>
    );
};

export default Header;
