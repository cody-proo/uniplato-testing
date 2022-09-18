import express from "express";
import { config } from "./config";
import rateLimiter from "express-rate-limit";
import { AppRoutes } from "./config/routes.config";

const bootstrap = () => {
  const app = express();
  app.use(express.json());
  app.use(
    rateLimiter({
      // waiting time after get error
      windowMs: 60 * 1000 * 1,
      // maximum number of request that receive from ip
      max: 10,
      legacyHeaders: false,
    })
  );

  // Config All Routes In App
  new AppRoutes(app).config();

  app.listen(config.PORT, () => {
    console.log(`The server is running at ${config.PORT}`);
  });
};

// App Runner
bootstrap();
