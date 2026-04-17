import express from 'express';
import {
  getAllSurahsController,
  getSurahByIdController,
  searchAyahsController,
} from './quran.controller.js';

const router = express.Router();

// Search must come BEFORE /surahs/:id to avoid route conflicts
router.get('/search', searchAyahsController);
router.get('/surahs', getAllSurahsController);
router.get('/surahs/:id', getSurahByIdController);

export default router;
