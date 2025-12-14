import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import Product from "../models/product.model.js";
import User from "../models/user.model.js";
import Coupon from "../models/coupon.model.js";
import Order from "../models/order.model.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, "..", ".env") });

const products = [
    {
        name: "Nike Air Max 2025",
        description: "Comfortable running shoes with breathable mesh and Air cushioning.",
        price: 149.99,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
        category: "Shoes",
        isFeatured: true,
    },
    {
        name: "Apple AirPods Pro",
        description: "Noise-cancelling true wireless earbuds with transparency mode.",
        price: 249.99,
        image: "https://images.unsplash.com/photo-1588421357574-87938a86fa7a",
        category: "Electronics",
        isFeatured: false,
    },
    {
        name: "Samsung Galaxy S23",
        description: "Latest Samsung flagship with 200MP camera and AMOLED display.",
        price: 999.99,
        image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9",
        category: "Mobile Phones",
        isFeatured: true,
    },
    {
        name: "Wooden Office Desk",
        description: "Modern wooden desk perfect for home office setup.",
        price: 299.99,
        image: "https://images.unsplash.com/photo-1598300055781-5d50eb0b7f81",
        category: "Furniture",
        isFeatured: false,
    },
    {
        name: "Sony WH-1000XM5",
        description: "Flagship noise-cancelling headphones with 30-hour battery life.",
        price: 399.99,
        image: "https://images.unsplash.com/photo-1519677100203-a0e668c92439",
        category: "Electronics",
        isFeatured: true,
    },
    {
        name: "HP Envy x360",
        description: "2-in-1 convertible laptop with Ryzen 7 and 16GB RAM.",
        price: 1199.99,
        image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8",
        category: "Laptops",
        isFeatured: false,
    },
    {
        name: "Patagonia Duffel 55L",
        description: "Durable travel duffel bag with recycled materials.",
        price: 139.99,
        image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
        category: "Accessories",
        isFeatured: false,
    },
    {
        name: "Nintendo Switch OLED",
        description: "Hybrid gaming console with 7-inch OLED display.",
        price: 349.99,
        image: "https://images.unsplash.com/photo-1522120692085-1c1c1c4d203c",
        category: "Gaming",
        isFeatured: true,
    },
];

const users = [
    {
        name: "Alice Customer",
        email: "alice@example.com",
        password: "Password123!",
        role: "customer",
    },
    {
        name: "Bob Admin",
        email: "admin@example.com",
        password: "AdminPass123!",
        role: "admin",
    },
    {
        name: "Charlie Cart",
        email: "cart@example.com",
        password: "CartPass123!",
        role: "customer",
    },
];

const daysFromNow = (days) => new Date(Date.now() + days * 24 * 60 * 60 * 1000);

const seedData = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB Connected.");

        await Promise.all([
            Product.deleteMany(),
            User.deleteMany(),
            Coupon.deleteMany(),
            Order.deleteMany(),
        ]);
        console.log("Old data removed.");

        const createdProducts = await Product.insertMany(products);
        console.log(`Inserted ${createdProducts.length} products.`);

        const [customer, admin, cartTester] = await User.create(users);
        console.log(`Inserted ${[customer, admin, cartTester].length} users.`);

        cartTester.cartItems = [
            { productId: createdProducts[0]._id, quantity: 2 },
            { productId: createdProducts[3]._id, quantity: 1 },
        ];
        await cartTester.save();
        console.log("Cart items seeded for cart tester.");

        await Coupon.insertMany([
            {
                code: "WELCOME10",
                discountPercentage: 10,
                expirationDate: daysFromNow(30),
                isActive: true,
                userId: customer._id,
            },
            {
                code: "LOYAL20",
                discountPercentage: 20,
                expirationDate: daysFromNow(60),
                isActive: true,
                userId: admin._id,
            },
            {
                code: "EXPIRED5",
                discountPercentage: 5,
                expirationDate: daysFromNow(-1),
                isActive: true,
                userId: cartTester._id,
            },
        ]);
        console.log("Coupons seeded.");

        const orderTemplates = [
            {
                user: customer._id,
                items: [
                    { productIndex: 1, quantity: 1 }, // AirPods
                    { productIndex: 2, quantity: 2 }, // Galaxy S23
                ],
                stripeSessionId: "sess_test_paid_1",
                createdAt: daysFromNow(-5),
            },
            {
                user: admin._id,
                items: [
                    { productIndex: 3, quantity: 1 }, // Desk
                    { productIndex: 4, quantity: 1 }, // Sony headphones
                ],
                stripeSessionId: "sess_test_paid_2",
                createdAt: daysFromNow(-2),
            },
            {
                user: cartTester._id,
                items: [
                    { productIndex: 0, quantity: 3 }, // Air Max shoes
                    { productIndex: 7, quantity: 1 }, // Switch OLED
                ],
                stripeSessionId: "sess_test_paid_3",
                createdAt: daysFromNow(-1),
            },
        ];

        const orders = orderTemplates.map((template) => {
            const productsForOrder = template.items.map(({ productIndex, quantity }) => {
                const prod = createdProducts[productIndex];
                return {
                    product: prod._id,
                    quantity,
                    price: prod.price,
                };
            });

            const totalAmount = productsForOrder.reduce(
                (sum, item) => sum + item.price * item.quantity,
                0
            );

            return {
                user: template.user,
                products: productsForOrder,
                totalAmount,
                stripeSessionId: template.stripeSessionId,
                createdAt: template.createdAt,
                updatedAt: template.createdAt,
            };
        });

        await Order.insertMany(orders);
        console.log(`Inserted ${orders.length} orders.`);

        await mongoose.connection.close();
        console.log("Database connection closed.");
        process.exit(0);
    } catch (error) {
        console.error("Seeding Error:", error);
        process.exit(1);
    }
};

seedData();
