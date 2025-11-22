import p1 from "../assets/images/p1.png";
import p2 from "../assets/images/p2.png";
import p3 from "../assets/images/p3.png";
import p4 from "../assets/images/p4.png";
import p5 from "../assets/images/p5.png";
import p6 from "../assets/images/p6.png";



const products = [
    { id: 1, name: "Men Shirt", price: 50, img: p1 },
    { id: 2, name: "Women Dress", price: 60, img: p2 },
    { id: 3, name: "Casual Shoes", price: 80, img: p3 },
    { id: 4, name: "Leather Bag", price: 45, img: p4 },
    { id: 5, name: "Watch", price: 120, img: p5 },
    { id: 6, name: "Sunglasses", price: 40, img: p6 },
];

const OurProducts = () => {
    return (
        <section className="product_section layout_padding">
            <div className="container">

                <div className="heading_container heading_center">
                    <h2>Our Products</h2>
                </div>

                <div className="row">
                    {products.map((product) => (
                        <div className="col-sm-6 col-md-4" key={product.id}>
                            <div className="box">
                                <div className="img-box">
                                    <img src={product.img} alt={product.name} className="product-img" />
                                </div>
                                <div className="detail-box">
                                    <h5>{product.name}</h5>
                                    <h6>${product.price}</h6>
                                </div>
                                <div className="option_container">
                                    <div className="options">
                                        <a href="#" className="option1">
                                            Add To Cart
                                        </a>
                                        <a href="#" className="option2">
                                            Buy Now
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="btn-box text-center mt-4">
                    <a href="#" className="btn btn-primary px-4 py-2">
                        View All Products
                    </a>
                </div>

            </div>
        </section>
    );
};

export default OurProducts;
