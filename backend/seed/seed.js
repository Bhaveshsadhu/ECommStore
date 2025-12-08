import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "../models/product.model.js";

dotenv.config({ path: "backend/.env" });

// Sample Product Data
const products = [
    {
        name: "Nike Air Max 2025",
        description: "Comfortable running shoes with breathable mesh and Air cushioning.",
        price: 149.99,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
        category: "Shoes",
        isFeatured: true
    },
    {
        name: "Apple AirPods Pro",
        description: "Noise-cancelling true wireless earbuds with transparency mode.",
        price: 249.99,
        image: "https://images.unsplash.com/photo-1588421357574-87938a86fa7a",
        category: "Electronics",
        isFeatured: false
    },
    {
        name: "Samsung Galaxy S23",
        description: "Latest Samsung flagship with 200MP camera and AMOLED display.",
        price: 999.99,
        image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9",
        category: "Mobile Phones",
        isFeatured: true
    },
    {
        name: "Wooden Office Desk",
        description: "Modern wooden desk perfect for home office setup.",
        price: 299.99,
        image: "https://images.unsplash.com/photo-1598300055781-5d50eb0b7f81",
        category: "Furniture",
        isFeatured: false
    }
];

const seedData = async () => {
    try {
        // await mongoose.connect(process.env.MONGO_URI);
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB Connected.");

        // Optional: Clear previous products
        await Product.deleteMany();
        console.log("Old products removed.");

        // Insert new products
        await Product.insertMany(products);
        console.log("Products seeded successfully!");

        mongoose.connection.close();
        console.log("Database connection closed.");
        process.exit(0);
    } catch (error) {
        console.error("Seeding Error:", error);
        process.exit(1);
    }
};

seedData();
