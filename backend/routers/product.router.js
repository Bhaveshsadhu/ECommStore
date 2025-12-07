import express from 'express';
import { addNewProduct, deleteProduct, getAllProducts, updateProduct } from '../controllers/product.controller.js';
import { authorizeRoles, protectRoutes } from '../middlewares/auth.middleware.js';
import { ROLES } from '../utils/roles.config.js';
import { validate } from '../middlewares/validate.middleware.js';
import { addProductSchema, updateProductSchema } from '../validation/product.validation.js';

const router = express.Router();

router.get('/', protectRoutes, authorizeRoles(ROLES.ADMIN), getAllProducts)
router.post("/addProduct", validate(addProductSchema), protectRoutes, authorizeRoles(ROLES.ADMIN), addNewProduct)
router.put("/updateProduct/:id", validate(updateProductSchema), protectRoutes, authorizeRoles(ROLES.ADMIN), updateProduct)
router.delete("/deleteProduct/:id", protectRoutes, authorizeRoles(ROLES.ADMIN), deleteProduct)

export default router;