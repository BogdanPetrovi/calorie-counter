import { Router } from 'express'
import { getUserInfo, loginUser, registerUser } from '../controllers/authController.js';
import { isLoggedIn } from '../middlewares/authMiddlware.js';

const router = Router();


router.post('/register', registerUser)

router.post('/login', loginUser)

router.get('/getUserInfo', isLoggedIn, getUserInfo)



export default router;