import { generateResponse } from '../../lib/responseFormate.js';
import { getAllSurahs, getSurahById, searchAyahs } from './quran.service.js';

export const getAllSurahsController = async (req, res) => {
  try {
    const surahs = getAllSurahs();
    generateResponse(res, 200, true, 'Surahs fetched successfully', surahs);
  } catch (error) {
    console.error(error);
    generateResponse(res, 500, false, 'Failed to fetch surahs', null);
  }
};

export const getSurahByIdController = async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id) || id < 1 || id > 114) {
      return generateResponse(
        res,
        400,
        false,
        'Invalid surah id (must be 1-114)',
        null
      );
    }
    const surah = getSurahById(id);
    if (!surah) {
      return generateResponse(res, 404, false, 'Surah not found', null);
    }
    generateResponse(res, 200, true, 'Surah fetched successfully', surah);
  } catch (error) {
    console.error(error);
    generateResponse(res, 500, false, 'Failed to fetch surah', null);
  }
};

export const searchAyahsController = async (req, res) => {
  try {
    const q = (req.query.q ?? '').toString();
    if (q.trim().length < 2) {
      return generateResponse(
        res,
        400,
        false,
        'Query must be at least 2 characters',
        null
      );
    }
    const results = searchAyahs(q);
    generateResponse(res, 200, true, 'Search completed', {
      results,
      count: results.length,
    });
  } catch (error) {
    console.error(error);
    generateResponse(res, 500, false, 'Failed to search ayahs', null);
  }
};
