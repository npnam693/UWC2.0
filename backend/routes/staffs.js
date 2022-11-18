import express from 'express';
import * as StaffController from '../controllers/StaffControllers.js'

const router = express.Router();

router.get('/', StaffController.StaffList)

export default router;
