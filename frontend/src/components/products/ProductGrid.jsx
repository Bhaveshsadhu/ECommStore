import ProductCard from "./ProductCard";

// Dummy data (Later replace with API from backend)
import p1 from "../../assets/images/p1.png";
import p2 from "../../assets/images/p2.png";
import p3 from "../../assets/images/p3.png";

const products = [
    { id: 1, name: "Men Shirt", price: 50, img: p1 },
    { id: 2, name: "Women Dress", price: 60, img: p2 },
    { id: 3, name: "Casual Shoes", price: 80, img: p3 },
    { id: 4, name: "Smart Watch", price: 120, img: p3 },
    { id: 5, name: "Sunglasses", price: 40, img: p2 },
    { id: 6, name: "Backpack", price: 70, img: p1 },
];

const ProductGrid = () => {
    return (
        <div className="row">
            {products.map((product) => (
                <div className="col-sm-6 col-md-4 mb-4" key={product.id}>
                    <ProductCard product={product} />
                </div>
            ))}
        </div>
    );
};

export default ProductGrid;
