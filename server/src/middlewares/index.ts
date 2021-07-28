import { json } from "express";
import { disablePoweredBy } from "./disablePoweredBy";
import { isLimiter, isSpeedLimiter } from "../@types/LimitersModel";
import { Application } from "express";
import rateLimiter from "express-rate-limit";
import slowDown from "express-slow-down";
import cors from 'cors'

const setupMiddlewares = (app: Application) => {
  app.use(json());

  app.use(disablePoweredBy);

  app.use(
    cors({
      origin: ['http://localhost:3001'],
    })
  );

  const limiter = rateLimiter({
    windowMs: 1 * 60 * 1000,
    max: 120,
  } as isLimiter);

  const speedLimiter = slowDown({
    windowMs: 1 * 60 * 1000,
    delayAfter: 100,
    delayMs: 1000,
  } as isSpeedLimiter);

  app.use(limiter);
  app.use(speedLimiter);
};

export { setupMiddlewares };
