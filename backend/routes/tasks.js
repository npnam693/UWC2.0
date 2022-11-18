import express from 'express';
import * as TaskController from '../controllers/TaskControllers'

const router = express.Router();

router.get('/', TaskController.TaskList)

export default router;
