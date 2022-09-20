export const userApi = {
  "/user/signup": {
    post: {
      description: "Signup User",
      operationId: "SignupUser",
      parameters: [],
      requestBody: {
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/SingupInput",
            },
          },
        },
      },
      responses: {
        "201": {
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/token",
              },
            },
          },
        },
      },
    },
  },
  "/user/login": {
    post: {
      description: "Login User",
      operationId: "LoginUser",
      parameters: [],
      requestBody: {
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/LoignInput",
            },
          },
        },
      },
      responses: {
        "201": {
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/token",
              },
            },
          },
        },
      },
    },
  },
  "/user": {
    get: {
      security: [
        {
          bearerAuth: [],
        },
      ],
      description: "Porfile User",
      operationId: "ProfileUser",
      parameters: [],
      responses: {
        "201": {
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/User",
              },
            },
          },
        },
      },
    },
  },
};
