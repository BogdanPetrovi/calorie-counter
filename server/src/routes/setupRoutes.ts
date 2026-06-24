import { Router } from 'express'
import { isLoggedIn } from '../middlewares/authMiddlware.js'
import { uploadUserData } from '../controllers/setupController.js'

const router = Router()

router.post('/', isLoggedIn, uploadUserData)

export default router