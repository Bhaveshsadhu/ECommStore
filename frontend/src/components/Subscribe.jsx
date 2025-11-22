const Subscribe = () => {
    return (
        <section className="subscribe_section py-5" style={{ backgroundColor: "#f5f5f5" }}>
            <div className="container">

                <div className="heading_container heading_center mb-4">
                    <h2>Subscribe To Get Discount Offers</h2>
                    <p className="mt-2">
                        Subscribe to our newsletter and stay updated on new arrivals, sales, and exclusive deals!
                    </p>
                </div>

                <div className="row justify-content-center">
                    <div className="col-md-6">

                        <form className="subscribe_form d-flex">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="form-control me-2"
                                required
                            />
                            <button type="submit" className="btn btn-danger px-4">
                                Subscribe
                            </button>
                        </form>

                    </div>
                </div>

            </div>
        </section>
    );
};

export default Subscribe;
