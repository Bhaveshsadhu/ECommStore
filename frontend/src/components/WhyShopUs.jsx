import { FaShippingFast, FaTruck, FaMedal } from "react-icons/fa";

const WhyShopUs = () => {
    return (
        <section className="why_section layout_padding">
            <div className="container">
                <div className="heading_container heading_center">
                    <h2>Why Shop With Us</h2>
                </div>

                <div className="row">

                    {/* Box 1 */}
                    <div className="col-md-4">
                        <div className="box">
                            <div className="color-icon bg-orange">
                                <FaTruck size={40} />
                            </div>
                            <div className="detail-box">
                                <h5>Fast Delivery</h5>
                                <p>
                                    We ensure quick delivery with trusted logistics partners.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Box 2 */}
                    <div className="col-md-4">
                        <div className="box">
                            <div className="color-icon bg-blue">
                                <FaShippingFast size={40} />
                            </div>
                            <div className="detail-box">
                                <h5>Free Shipping</h5>
                                <p>
                                    Enjoy free shipping on all your orders with no extra fees.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Box 3 */}
                    <div className="col-md-4">
                        <div className="box">
                            <div className="color-icon bg-green">
                                <FaMedal size={40} />
                            </div>
                            <div className="detail-box">
                                <h5>Best Quality</h5>
                                <p>
                                    We provide top-quality products sourced from trusted brands.
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default WhyShopUs;
