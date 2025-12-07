import Joi from "joi";

export const addProductSchema = Joi.object({
    name: Joi.string().min(2).max(100).required(),
    description: Joi.string().min(5).max(500).required(),
    price: Joi.number().min(0).required(),
    image: Joi.string().uri().required(),   // image URL
    category: Joi.string().min(2).required(),
    isFeatured: Joi.boolean().optional()
});
export const updateProductSchema = Joi.object({
    name: Joi.string().min(2).max(100).optional(),
    description: Joi.string().min(5).max(500).optional(),
    price: Joi.number().min(0).optional(),
    image: Joi.string().uri().optional(),
    category: Joi.string().min(2).optional(),
    isFeatured: Joi.boolean().optional()
}).min(1); // At least one field must be provided for update
