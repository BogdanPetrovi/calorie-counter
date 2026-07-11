import { Router } from 'express'
import { changePersonalInfo, getUserInfo, loginUser, logOut, registerUser } from '../controllers/authController.js';
import { isLoggedIn } from '../middlewares/authMiddlware.js';

const router = Router();

router.post('/register', registerUser)

router.post('/login', loginUser)

router.post('/logOut', isLoggedIn, logOut)

router.get('/getUserInfo', isLoggedIn, getUserInfo)

router.post('/update-personal-info', isLoggedIn, changePersonalInfo)

export default router;