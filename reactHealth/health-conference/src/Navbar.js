import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="navbar">
            <h1>The Dojo blog</h1>
            <div className="links">
                <Link to="/">Home</Link>
                <Link to="/create">New blog</Link>
                <Link to="/blogs/1">Blogs</Link>
            </div>
        </nav>
    );
}

export default Navbar;