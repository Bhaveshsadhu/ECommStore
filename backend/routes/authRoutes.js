import express from 'express'
import { createUser, loginUser, logoutUser, profile, refreshAccessToken } from '../controllers/authController.js'
import { protect } from '../middleware/authMiddleware.js'
const router = express.Router()


router.post('/register', createUser)
router.post('/login', loginUser)
router.post('/logout', logoutUser)
router.get('/profile', protect, profile)
router.post("/refresh", refreshAccessToken);



export default router;