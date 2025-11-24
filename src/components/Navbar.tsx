import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav>
            <Link to="/">Customers</Link>
            <Link to="/trainings">Trainings</Link>
        </nav>
    )
}

export default Navbar;