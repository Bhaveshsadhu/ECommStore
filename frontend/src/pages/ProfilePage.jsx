import { useSelector } from "react-redux";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const UserProfile = () => {
    // Get user from Redux store
    const { user, role } = useSelector((state) => state.auth);

    return (
        <>
            <Navbar />
            <section className="profile-section py-5">
                <div className="container">
                    <div className="row justify-content-center">

                        {/* Left - Profile Card */}
                        <div className="col-lg-4 col-md-6 mb-4">
                            <div className="card shadow-sm border-0 text-center p-4 rounded-4">

                                <img
                                    src={user?.avatar || "https://via.placeholder.com/150"}
                                    alt="profile"
                                    className="rounded-circle mx-auto mb-3 profile-img"
                                />

                                <h4 className="fw-bold">{user?.name || "User Name"}</h4>
                                <p className="text-muted mb-2">{user?.email}</p>

                                <span className="badge bg-primary px-3 py-2 rounded-pill">
                                    {role || "User"}
                                </span>

                                <hr className="my-4" />

                                <button className="btn btn-dark w-100 rounded-pill">
                                    Edit Profile
                                </button>
                            </div>
                        </div>

                        {/* Right - Details */}
                        <div className="col-lg-8 col-md-6">
                            <div className="card shadow-sm border-0 p-4 rounded-4">
                                <h4 className="fw-bold mb-4">Profile Details</h4>

                                <div className="row mb-3">
                                    <div className="col-sm-4 fw-semibold">Full Name</div>
                                    <div className="col-sm-8 text-muted">{user?.name}</div>
                                </div>

                                <div className="row mb-3">
                                    <div className="col-sm-4 fw-semibold">Email</div>
                                    <div className="col-sm-8 text-muted">{user?.email}</div>
                                </div>

                                <div className="row mb-3">
                                    <div className="col-sm-4 fw-semibold">Phone</div>
                                    <div className="col-sm-8 text-muted">
                                        {user?.phone || "Not Provided"}
                                    </div>
                                </div>

                                <div className="row mb-3">
                                    <div className="col-sm-4 fw-semibold">Address</div>
                                    <div className="col-sm-8 text-muted">
                                        {user?.address || "Not Provided"}
                                    </div>
                                </div>

                                <div className="row mb-3">
                                    <div className="col-sm-4 fw-semibold">Account Created</div>
                                    <div className="col-sm-8 text-muted">
                                        {user?.createdAt
                                            ? new Date(user.createdAt).toDateString()
                                            : "N/A"}
                                    </div>
                                </div>

                                <hr />

                                <button className="btn btn-outline-danger rounded-pill">
                                    Logout
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
};

export default UserProfile;
