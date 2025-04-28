import express from 'express';
import { createSchedule } from '../controllers/scheduleController.js';

const router = express.Router();

// Create Schedule
router.post('/create', createSchedule);

export default router;
