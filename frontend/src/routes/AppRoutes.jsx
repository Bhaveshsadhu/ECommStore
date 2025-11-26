import { Route, Router, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import ProductPage from '../pages/ProductPage'
import BlogPage from '../pages/BlogPage'
import ContactPage from '../pages/ContactPage'
import LoginPage from '../pages/LoginPage'
import RegisterPage from '../pages/RegisterPage'
import ProfilePage from '../pages/ProfilePage'

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<ProductPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/profile" element={<ProfilePage />} />
        </Routes>
    )
}

export default AppRoutes