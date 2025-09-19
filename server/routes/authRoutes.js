import { Router } from 'express'
import { getUserInfo, loginUser, logOut, registerUser } from '../controllers/authController.js';
import { isLoggedIn } from '../middlewares/authMiddlware.js';

const router = Router();


router.post('/register', registerUser)

router.post('/login', loginUser)

router.post('/logOut', isLoggedIn, logOut)

router.get('/getUserInfo', isLoggedIn, getUserInfo)



export default router;