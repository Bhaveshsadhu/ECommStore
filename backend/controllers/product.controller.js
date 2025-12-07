import cloudinary from "../database/cloudinary.js";
import { getFeatureProducts, setFeatureProducts } from "../database/redis.js";
import Product from "../models/product.model.js";

export const getAllProducts = async (req, res, next) => {
    try {
        const products = await Product.find();
        res.status(200).json({
            status: "success",
            results: products.length,
            data: products
        });
    } catch (error) {
        next(error);
    }
}
export const addNewProduct = async (req, res, next) => {
    try {
        const { name, description, price, image, category, isFeatured } = req.body;

        let cloudinaryResponse = null;

        if (image) {
            cloudinaryResponse = await cloudinary.uploader.upload(image, { folder: "products" });
        }

        const product = await Product.create({
            name,
            description,
            price,
            image: cloudinaryResponse?.secure_url ? cloudinaryResponse.secure_url : "",
            category,
            isFeatured: isFeatured || false
        });

        res.status(201).json({
            status: "success",
            message: "Product created successfully",
            data: product
        });
    } catch (error) {
        next(error);
    }
}

export const updateProduct = async (req, res, next) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updatedProduct) {
            return res.status(404).json({
                status: "fail",
                message: "Product not found"
            });
        }
        res.status(200).json({
            status: "success",
            message: "Product updated successfully",
            data: updatedProduct
        });
    } catch (error) {
        next(error);
    }
}

export const deleteProduct = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        if (product.image) {
            const publicId = product.image.split("/").pop().split(".")[0];
            try {
                await cloudinary.uploader.destroy(`products/${publicId}`);
                console.log("deleted image from cloduinary");
            } catch (error) {
                console.log("error deleting image from cloduinary", error);
            }
        }

        await Product.findByIdAndDelete(req.params.id);

        res.json({ message: "Product deleted successfully" });
    } catch (error) {
        console.log("Error in deleteProduct controller", error.message);
        res.status(500).json({ message: "Server error", error: error.message });
    }
}
export const getFeaturedProducts = async (req, res) => {
    try {
        let featuredProducts = await getFeatureProducts();
        if (featuredProducts) {
            return res.json(featuredProducts);
        }

        // if not in redis, fetch from mongodb
        // .lean() is gonna return a plain javascript object instead of a mongodb document
        // which is good for performance
        featuredProducts = await Product.find({ isFeatured: true }).lean();

        if (!featuredProducts) {
            return res.status(404).json({ message: "No featured products found" });
        }

        // store in redis for future quick access

        await setFeatureProducts(featuredProducts);

        res.json(featuredProducts);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};