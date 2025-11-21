import { Link } from "react-router-dom";
import logo from "../assets/images/logo.png"; // adjust based on your structure
import { TbBrandAppstore } from "react-icons/tb";
const Navbar = () => {
    return (
        <header className="header_section">
            <div className="container">
                <nav className="navbar navbar-expand-lg custom_nav-container">
                    {/* Logo */}
                    <Link className="navbar-brand pt-0" to="/">
                        <span className="brand-icon"><TbBrandAppstore /></span>
                        <span className="brand-text ms-2">ECommStore</span>

                    </Link>


                    {/* Toggler */}
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span></span>
                    </button>

                    {/* Menu */}
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav">

                            <li className="nav-item">
                                <Link className="nav-link" to="/">Home</Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link" to="/products">Products</Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link" to="/blog">Blog</Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link" to="/contact">Contact</Link>
                            </li>

                            {/* Cart Icon */}
                            <li className="nav-item">
                                <Link className="nav-link" to="/cart">
                                    <i className="fa fa-shopping-cart"></i>
                                </Link>
                            </li>

                            {/* Search Button */}
                            <form className="form-inline">
                                <button
                                    className="btn my-2 my-sm-0 nav_search-btn"
                                    type="button"
                                >
                                    <i className="fa fa-search"></i>
                                </button>
                            </form>
                        </ul>
                    </div>
                </nav>
            </div>
        </header>
    );
};

export default Navbar;
