import express from 'express';
import { getUserProfile, reCreateAccessToken, userLogin, userLogout, userRegistration } from '../controllers/user.controller.js';
import { validate } from '../middlewares/validate.middleware.js';
import { loginSchema, registerSchema } from '../validation/user.validation.js';
import { protectRoutes } from '../middlewares/auth.middleware.js';
const router = express.Router();

// user route
router.post('/register', validate(registerSchema), userRegistration);
router.post('/login', validate(loginSchema), userLogin);
router.get('/logout', userLogout);
router.get('/re-createaccesstoken', reCreateAccessToken);
router.get('/profile', protectRoutes, getUserProfile);



export default router;