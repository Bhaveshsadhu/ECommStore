const ProductFilter = () => {
    return (
        <div className="product_filter p-3 shadow-sm rounded">
            <h4 className="mb-3">Filters</h4>

            <div className="mb-3">
                <label className="form-label fw-bold">Category</label>
                <select className="form-select">
                    <option>All</option>
                    <option>Men</option>
                    <option>Women</option>
                    <option>Accessories</option>
                    <option>Shoes</option>
                </select>
            </div>

            <div className="mb-3">
                <label className="form-label fw-bold">Price Range</label>
                <input type="range" className="form-range" />
            </div>

            <div className="mb-3">
                <label className="form-label fw-bold">Sort By</label>
                <select className="form-select">
                    <option>Default</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                </select>
            </div>
        </div>
    );
};

export default ProductFilter;
