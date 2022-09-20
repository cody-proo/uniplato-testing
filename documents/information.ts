import { components } from "./component";
import { categoryApi } from "./categoryapi";
import { userApi } from "./userApi";
export const information = {
  openapi: "3.0.1",
  info: {
    version: "1.0.0",
    title: "Express App",
    description: "Express TypeScipt Prisma API",
    contact: {
      name: "Nima Ladmakhi",
      email: "",
    },
  },
  servers: [
    {
      url: "http://localhost:3002/", // url
      description: "Local server", // name
    },
  ],
  tags: [
    {
      name: "Category & User Operations",
    },
  ],
  components: components.components,
  paths: {
    ...categoryApi,
    ...userApi,
  },
};
