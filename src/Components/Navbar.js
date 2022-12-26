import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <div className="navbar">
            <h2>Hodowla Yorkland</h2>
            <div className="links">
                <Link to="/"> Home </Link>
                <Link to="/Dogs">Dogs</Link>
                <Link to="/NewDog">New Dog</Link>
            </div>
        </div>
    );
}

export default Navbar;