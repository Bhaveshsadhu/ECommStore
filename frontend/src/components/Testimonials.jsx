import { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

import client from "../assets/images/client.jpg";

const testimonials = [
    {
        id: 1,
        name: "Anna Trevor",
        role: "Customer",
        text:
            "Dignissimos reprehenderit repellendus nobis error quibusdam? Atque animi sint unde saepe rerum doloremque!",
        img: client,
    },
    {
        id: 2,
        name: "Michael Reed",
        role: "Customer",
        text:
            "Excellent shopping experience! High-quality products and quick delivery. Highly recommend this store!",
        img: client,
    },
    {
        id: 3,
        name: "Sofia Bennett",
        role: "Customer",
        text:
            "Very smooth ordering process and great packaging. Will definitely shop here again!",
        img: client,
    },
];

const Testimonials = () => {
    const [index, setIndex] = useState(0);

    const prevTestimonial = () => {
        setIndex(index === 0 ? testimonials.length - 1 : index - 1);
    };

    const nextTestimonial = () => {
        setIndex(index === testimonials.length - 1 ? 0 : index + 1);
    };

    const t = testimonials[index];

    return (
        <section className="testimonial_section py-5 text-center">
            <div className="container">

                <h2 className="testimonial_title">Customer's Testimonial</h2>
                <div className="red_line mx-auto mb-4"></div>

                {/* Profile Image */}
                <div className="d-flex justify-content-center align-items-center gap-5 mt-4">

                    <button className="arrow-btn" onClick={prevTestimonial}>
                        <FaArrowLeft />
                    </button>

                    <img
                        src={t.img}
                        alt={t.name}
                        className="rounded-circle testimonial-img"
                    />

                    <button className="arrow-btn" onClick={nextTestimonial}>
                        <FaArrowRight />
                    </button>

                </div>

                {/* Name + Role */}
                <h4 className="mt-3 fw-bold">{t.name}</h4>
                <p className="text-muted">{t.role}</p>

                {/* Review Text */}
                <p className="mt-3 testimonial_text">{t.text}</p>

            </div>
        </section>
    );
};

export default Testimonials;
