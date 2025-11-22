import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import WhyShopUs from '../components/WhyShopUs'
import NewArrivals from '../components/NewArrivals'
import OurProducts from '../components/OurProducts'
import Subscribe from '../components/Subscribe'
import Testimonials from '../components/Testimonials'
import Footer from '../components/Footer'

const Home = () => {
    return (
        <div>
            <Navbar />
            <Hero />
            <WhyShopUs />
            <NewArrivals />
            <OurProducts />
            <Subscribe />
            <Testimonials />
            <Footer />
        </div>
    )
}

export default Home