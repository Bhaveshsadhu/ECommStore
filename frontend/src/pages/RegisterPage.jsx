import { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../features/auth/authThunks";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { toast } from "react-toastify";

const RegisterPage = () => {
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: "user",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const result = dispatch(registerUser(formData));

        if (registerUser.fulfilled.match(result)) {
            toast.success("Registration successful! Please login.");
            navigate("/login");
        }

        if (registerUser.rejected.match(result)) {
            toast.error(result.payload || "Registration failed");
        }

    };

    return (
        <>
            <Navbar />
            <section className="py-5" style={{ minHeight: "80vh", background: "#f8f9fa" }}>
                <div className="container d-flex justify-content-center">
                    <div className="card shadow-lg p-4" style={{ maxWidth: "450px", width: "100%" }}>

                        <h2 className="text-center mb-4 fw-bold">Register</h2>

                        <form onSubmit={handleSubmit}>

                            {/* NAME */}
                            <div className="mb-3">
                                <label className="form-label fw-bold">Full Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    className="form-control"
                                    placeholder="Enter your full name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            {/* EMAIL */}
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

                            {/* PASSWORD */}
                            <div className="mb-3">
                                <label className="form-label fw-bold">Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    className="form-control"
                                    placeholder="Create a password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            {/* ROLE (optional) */}
                            <div className="mb-3">
                                <label className="form-label fw-bold">Account Type</label>
                                <select
                                    name="role"
                                    className="form-select"
                                    value={formData.role}
                                    onChange={handleChange}
                                >
                                    <option value="user">User</option>
                                    <option value="vendor">Vendor</option>
                                </select>
                            </div>

                            {/* SUBMIT */}
                            <button type="submit" className="btn btn-danger w-100 fw-semibold">
                                Register
                            </button>

                            {/* LOGIN LINK */}
                            <div className="text-center mt-3">
                                <p>
                                    Already have an account?{" "}
                                    <Link to="/login" className="text-danger fw-bold">
                                        Login
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

export default RegisterPage;
