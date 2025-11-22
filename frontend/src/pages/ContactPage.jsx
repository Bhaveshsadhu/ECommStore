import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const ContactPage = () => {
    return (
        <>
            <Navbar />
            <section className="contact_section py-5">
                <div className="container">

                    {/* Page Title */}
                    <div className="heading_container heading_center mb-5">
                        <h2>Contact Us</h2>
                        <p className="text-muted">
                            We'd love to hear from you! Please reach out using the form below.
                        </p>
                    </div>

                    <div className="row">

                        {/* Contact Form */}
                        <div className="col-md-6 mb-4">
                            <div className="contact_form p-4 shadow-sm rounded">

                                <form>
                                    <div className="mb-3">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Full Name"
                                            required
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <input
                                            type="email"
                                            className="form-control"
                                            placeholder="Email Address"
                                            required
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Phone Number"
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <textarea
                                            className="form-control"
                                            rows="5"
                                            placeholder="Your Message"
                                            required
                                        ></textarea>
                                    </div>

                                    <button type="submit" className="btn btn-danger px-4 py-2">
                                        Send Message
                                    </button>
                                </form>

                            </div>
                        </div>

                        {/* Contact Info */}
                        <div className="col-md-6">
                            <div className="contact_info p-4">

                                <h4 className="fw-bold mb-3">Reach Us</h4>

                                <p className="mb-2">
                                    📍 Wollongong, NSW 2500, Australia
                                </p>

                                <p className="mb-2">
                                    📞 0405 983 990
                                </p>

                                <p className="mb-2">
                                    📧 support@ecommstore.com
                                </p>

                                <h5 className="fw-bold mt-4">Store Hours</h5>

                                <p>Mon–Fri: 9:00 AM – 6:00 PM</p>
                                <p>Sat–Sun: 10:00 AM – 4:00 PM</p>

                                {/* Optional Map */}
                                <div className="map_container mt-4">
                                    <iframe
                                        title="Map"
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3313.0221774764706!2d150.8931!3d-34.4278!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6b12f19372aa1c59%3A0x5040c!2sWollongong%20NSW!5e0!3m2!1sen!2sau!4v1700000000000"
                                        width="100%"
                                        height="250"
                                        style={{ border: 0 }}
                                        allowFullScreen=""
                                        loading="lazy"
                                    ></iframe>
                                </div>

                            </div>
                        </div>

                    </div>

                </div>
            </section>
            <Footer />
        </>
    );
};

export default ContactPage;
