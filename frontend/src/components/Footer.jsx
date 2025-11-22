import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="footer_section pt-5 pb-3" style={{ backgroundColor: "#f8f8f8" }}>
            <div className="container">

                <div className="row">

                    {/* About */}
                    <div className="col-md-4">
                        <h4 className="footer_title">ECommStore</h4>
                        <p className="footer_text">
                            Your trusted online shopping destination. Quality products,
                            fast delivery, and the best customer experience.
                        </p>

                        <div className="social_box mt-3">
                            <a href="#"><FaFacebookF /></a>
                            <a href="#"><FaTwitter /></a>
                            <a href="#"><FaInstagram /></a>
                            <a href="#"><FaLinkedinIn /></a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="col-md-4">
                        <h4 className="footer_title">Quick Links</h4>
                        <ul className="footer_links">
                            <li><a href="#">Home</a></li>
                            <li><a href="#">Products</a></li>
                            <li><a href="#">About</a></li>
                            <li><a href="#">Contact</a></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="col-md-4">
                        <h4 className="footer_title">Contact Us</h4>
                        <ul className="footer_links">
                            <li>📍 Wollongong, NSW, Australia</li>
                            <li>📞 0405 983 990</li>
                            <li>📧 support@ecommstore.com</li>
                        </ul>
                    </div>

                </div>

                {/* Copyright */}
                <div className="footer_bottom text-center mt-4 pt-3 border-top">
                    <p className="mb-0">
                        © {new Date().getFullYear()} ECommStore | All Rights Reserved.
                    </p>
                </div>

            </div>
        </footer>
    );
};

export default Footer;
