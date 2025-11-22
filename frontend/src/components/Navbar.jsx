import { Link, useNavigate } from "react-router-dom";
import { TbBrandAppstore } from "react-icons/tb";
import { FaShoppingCart } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../features/auth/authThunks.js";
import { toast } from "react-toastify";

const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Get data from Redux
    const { user, isAuthenticated } = useSelector((state) => state.auth);
    const { cartItems } = useSelector((state) => state.cart);

    const handleLogout = () => {
        const result = dispatch(logoutUser());

        if (logoutUser.fulfilled.match(result)) {
            toast.success("Logged out successfully!");
            navigate("/");
        }

        if (logoutUser.rejected.match(result)) {
            toast.error("Logout failed. Please try again.");
        }
    };

    return (
        <header className="header_section">
            <div className="container">
                <nav className="navbar navbar-expand-lg custom_nav-container">

                    {/* LOGO */}
                    <Link className="navbar-brand pt-0 d-flex align-items-center" to="/">
                        <span className="brand-icon"><TbBrandAppstore /></span>
                        <span className="brand-text ms-2">ECommStore</span>
                    </Link>

                    {/* MOBILE TOGGLER */}
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                    >
                        <span></span>
                    </button>

                    {/* MENU ITEMS */}
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto align-items-center">

                            {/* Default Links */}
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

                            {/* CART WITH COUNT */}
                            <li className="nav-item position-relative">
                                <Link className="nav-link" to="/cart">
                                    <FaShoppingCart size={20} />

                                    {/* Cart Number */}
                                    {cartItems.length > 0 && (
                                        <span className="cart-count">{cartItems.length}</span>
                                    )}
                                </Link>
                            </li>

                            {/* AUTH SECTION */}
                            {!isAuthenticated ? (
                                <>
                                    {/* WHEN NOT LOGGED IN */}
                                    <li className="nav-item ms-3">
                                        <Link className="btn btn-outline-dark btn-sm" to="/login">
                                            Login
                                        </Link>
                                    </li>

                                    <li className="nav-item ms-2">
                                        <Link className="btn btn-danger btn-sm" to="/register">
                                            Register
                                        </Link>
                                    </li>
                                </>
                            ) : (
                                <>
                                    {/* WHEN LOGGED IN */}
                                    <li className="nav-item dropdown ms-3">
                                        <button
                                            className="btn btn-outline-dark dropdown-toggle"
                                            data-bs-toggle="dropdown"
                                        >
                                            {user?.name} <span className="text-danger">({user?.role})</span>
                                        </button>

                                        <ul className="dropdown-menu">
                                            <li>
                                                <button className="dropdown-item">Profile</button>
                                            </li>

                                            {user.role === "admin" && (
                                                <li>
                                                    <button className="dropdown-item">Admin Dashboard</button>
                                                </li>
                                            )}

                                            {user.role === "vendor" && (
                                                <li>
                                                    <button className="dropdown-item">Vendor Panel</button>
                                                </li>
                                            )}

                                            <li>
                                                <button className="dropdown-item text-danger" onClick={handleLogout}>
                                                    Logout
                                                </button>
                                            </li>
                                        </ul>
                                    </li>
                                </>
                            )}

                        </ul>
                    </div>
                </nav>
            </div>
        </header>
    );
};

export default Navbar;
