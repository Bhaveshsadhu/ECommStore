const ProductCard = ({ product }) => {
    return (
        <div className="product_card shadow-sm p-3 rounded">

            <div className="text-center">
                <img
                    src={product.img}
                    alt={product.name}
                    className="img-fluid mb-3"
                    style={{ height: "200px", objectFit: "contain" }}
                />
            </div>

            <h5 className="fw-bold">{product.name}</h5>
            <p className="text-danger fw-bold">${product.price}</p>

            <div className="d-flex gap-2 mt-3">
                <button className="btn btn-dark w-50">Add to Cart</button>
                <button className="btn btn-danger w-50">Buy Now</button>
            </div>

        </div>
    );
};

export default ProductCard;
