import { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../features/auth/authThunks";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { toast } from "react-toastify";

const RegisterPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        phone: "",
        address: "",
        role: "user",
        profileImage: null, // file only
    });

    const handleChange = (e) => {
        if (e.target.name === "profileImage") {
            setFormData({ ...formData, profileImage: e.target.files[0] });
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // CREATE FORM DATA (important for image upload)
        const fd = new FormData();
        fd.append("name", formData.name);
        fd.append("email", formData.email);
        fd.append("password", formData.password);
        fd.append("phone", formData.phone);
        fd.append("address", formData.address);
        fd.append("role", formData.role);

        if (formData.profileImage) {
            fd.append("profileImage", formData.profileImage);
        }

        const result = await dispatch(registerUser(fd));

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

                            {/* FULL NAME */}
                            <div className="mb-3">
                                <label className="form-label fw-bold">Full Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    className="form-control"
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
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            {/* PHONE */}
                            <div className="mb-3">
                                <label className="form-label fw-bold">Phone Number</label>
                                <input
                                    type="text"
                                    name="phone"
                                    className="form-control"
                                    value={formData.phone}
                                    onChange={handleChange}
                                />
                            </div>

                            {/* ADDRESS */}
                            <div className="mb-3">
                                <label className="form-label fw-bold">Address</label>
                                <input
                                    type="text"
                                    name="address"
                                    className="form-control"
                                    value={formData.address}
                                    onChange={handleChange}
                                />
                            </div>

                            {/* PROFILE IMAGE */}
                            <div className="mb-3">
                                <label className="form-label fw-bold">Profile Image</label>
                                <input
                                    type="file"
                                    name="profileImage"
                                    className="form-control"
                                    accept="image/*"
                                    onChange={handleChange}
                                />
                            </div>

                            {/* PASSWORD */}
                            <div className="mb-3">
                                <label className="form-label fw-bold">Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    className="form-control"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            {/* ROLE */}
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
