import express from "express";
import { config } from "./config";
import { AppRoutes } from "./config/routes.config";

const bootstrap = () => {
  const app = express();
  app.use(express.json());

  // Config All Routes In App
  new AppRoutes(app).config();

  app.listen(config.PORT, () => {
    console.log(`The server is running at ${config.PORT}`);
  });
};

// App Runner
bootstrap();
