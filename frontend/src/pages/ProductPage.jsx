import ProductGrid from "../components/products/ProductGrid";
import ProductFilter from "../components/products/ProductFilter";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const ProductPage = () => {
    return (
        <>
            <Navbar />
            <section className="product_page py-5">
                <div className="container">

                    <div className="row">

                        {/* Sidebar Filter */}
                        <div className="col-md-3">
                            <ProductFilter />
                        </div>

                        {/* Product Listing */}
                        <div className="col-md-9">
                            <h2 className="mb-4">All Products</h2>
                            <ProductGrid />
                        </div>

                    </div>

                </div>
            </section>
            <Footer />
        </>
    );
};

export default ProductPage;
