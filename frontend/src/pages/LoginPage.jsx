import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../features/auth/authThunks";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // dispatch(loginUser(formData));
        const result = dispatch(loginUser(formData));

        if (loginUser.fulfilled.match(result)) {
            toast.success("Login successful!");
            navigate("/");
        }

        if (loginUser.rejected.match(result)) {
            toast.error(result.payload || "Invalid login credentials");
        }
    };

    return (
        <>
            <Navbar />
            <section className="login_section py-5">
                <div className="container d-flex justify-content-center">
                    <div className="login_card p-4 shadow-lg rounded">

                        <h2 className="text-center mb-4 login_title">Login</h2>

                        <form onSubmit={handleSubmit}>

                            <div className="mb-3">
                                <label className="form-label fw-bold">Email Address</label>
                                <input
                                    type="email"
                                    name="email"
                                    className="form-control"
                                    placeholder="Enter your email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label fw-bold">Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    className="form-control"
                                    placeholder="Enter your password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <button type="submit" className="btn btn-danger w-100 mt-3">
                                Login
                            </button>

                            <div className="text-center mt-3">
                                <p>
                                    Don't have an account?{" "}
                                    <Link to="/register" className="text-danger fw-bold">
                                        Register
                                    </Link>
                                </p>
                            </div>
                        </form>

                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
};

export default LoginPage;
