import express from 'express';
import quranRoutes from '../../entities/quran/quran.routes.js';

const router = express.Router();

router.use('/v1/quran', quranRoutes);

export default router;
