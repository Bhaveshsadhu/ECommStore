import arrivalsImg from "../assets/images/arrival-bg.png";

const NewArrivals = () => {
    return (
        <section className="new_arrivals_section py-5" style={{ backgroundColor: "#d4cecf" }}>
            <div className="container">
                <div className="row align-items-center">

                    {/* Left Image */}
                    <div className="col-md-6 text-center">
                        <img
                            src={arrivalsImg}
                            alt="New Arrivals"
                            className="img-fluid arrivals-img"
                            style={{ maxHeight: "500px" }}
                        />
                    </div>


                    {/* Right Content */}
                    <div className="col-md-6">
                        <h2 className="mb-3 arrivals-title">
                            <span>#</span>NewArrivals
                        </h2>

                        <p className="arrivals-text mb-4">
                            Vitae fugiat laboriosam officia perferendis provident aliquid
                            voluptatibus dolorem, fugit ullam sit earum id eaque nisi hic?
                            Tenetur commodi, nisi rem vel, ea eaque ab ipsa, autem similique
                            ex unde!
                        </p>

                        <a href="#" className="btn btn-danger px-4 py-2">
                            Shop Now
                        </a>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default NewArrivals;
