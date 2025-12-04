import express from 'express';
import { userLogin, userLogout, userRegistration } from '../controllers/user.controller.js';
const router = express.Router();

// Sample user route
router.post('/register', userRegistration);
router.post('/login', userLogin);
router.get('/logout', userLogout);


export default router;