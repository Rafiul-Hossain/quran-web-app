import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import xssClean from 'xss-clean';
import mongoSanitize from 'express-mongo-sanitize';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';

import logger from './core/config/logger.js';
import errorHandler from './core/middlewares/errorMiddleware.js';
import notFound from './core/middlewares/notFound.js';
import { globalLimiter } from './lib/limit.js';
import appRouter from './core/app/appRouter.js';

const app = express();

// Security middleware
app.use(helmet());
app.use(
  cors({
    origin: true,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  })
);
app.use(xssClean());
app.use(mongoSanitize());

// Logging
app.use(morgan('combined'));

// Body parsing
app.use(express.json({ limit: '10000kb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Rate limiting
app.use(globalLimiter);

// Health / root
app.get('/', (req, res) => {
  res.json({
    name: 'Quran API',
    version: '1.0.0',
    endpoints: [
      'GET /api/v1/quran/surahs',
      'GET /api/v1/quran/surahs/:id',
      'GET /api/v1/quran/search?q=text',
    ],
  });
});

// API routes
app.use('/api', appRouter);

// 404 & error handling
app.use(notFound);
app.use(errorHandler);

logger.info('Middleware stack initialized');

export { app };
