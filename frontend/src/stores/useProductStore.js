import { create } from "zustand";
import toast from "react-hot-toast";
import axios from "../lib/axios";

export const useProductStore = create((set) => ({
    products: [],
    loading: false,

    setProducts: (products) => set({ products }),
    createProduct: async (productData) => {
        set({ loading: true });
        try {
            const res = await axios.post("/products/addProduct", productData);

            if (res?.data?.status === "success") {
                set((prevState) => ({
                    products: [...prevState.products, res.data.data],
                    loading: false,
                }));
                toast[res.data.status](res.data.message);
            }
        } catch (error) {
            toast.error(error.response.data.error);
            set({ loading: false });
        }
    },
    fetchAllProducts: async () => {
        set({ loading: true });
        try {
            const response = await axios.get("/products/");
            console.log("response", response.data.data);
            set({ products: response.data.data, loading: false });
        } catch (error) {
            set({ error: "Failed to fetch products", loading: false });
            toast.error(error.response.data.error || "Failed to fetch products");
        }
    },
    fetchProductsByCategory: async (category) => {
        set({ loading: true });
        try {
            const response = await axios.get(`/products/category/${category}`);
            set({ products: response.data.data, loading: false });
        } catch (error) {
            set({ error: "Failed to fetch products", loading: false });
            toast.error(error.response.data.error || "Failed to fetch products");
        }
    },
    deleteProduct: async (productId) => {
        set({ loading: true });
        try {
            await axios.delete(`/products/deleteProduct/${productId}`);
            set((prevProducts) => ({
                products: prevProducts.products.filter((product) => product._id !== productId),
                loading: false,
            }));
        } catch (error) {
            set({ loading: false });
            toast.error(error.response.data.error || "Failed to delete product");
        }
    },
    toggleFeaturedProduct: async (productId) => {
        set({ loading: true });
        try {
            const response = await axios.patch(`/products/${productId}`);
            // this will update the isFeatured prop of the product
            set((prevProducts) => ({
                products: prevProducts.products.map((product) =>
                    product._id === productId ? { ...product, isFeatured: response.data.isFeatured } : product
                ),
                loading: false,
            }));
        } catch (error) {
            set({ loading: false });
            toast.error(error.response.data.error || "Failed to update product");
        }
    },
    fetchFeaturedProducts: async () => {
        set({ loading: true });
        try {
            const response = await axios.get("/products/featured");
            set({ products: response.data, loading: false });
        } catch (error) {
            set({ error: "Failed to fetch products", loading: false });
            console.log("Error fetching featured products:", error);
        }
    },
}));
