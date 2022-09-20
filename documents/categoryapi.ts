export const categoryApi = {
  "/category": {
    post: {
      security: [
        {
          bearerAuth: [],
        },
      ],
      description: "Create Category",
      operationId: "CreateCategory",
      parameters: [],
      requestBody: {
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/CategoryInput",
            },
          },
        },
      },
      responses: {
        "201": {
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/CategoryInput",
              },
            },
          },
        },
      },
    },
    get: {
      description: "Get All Category",
      operationId: "GetAllCategory",
      parameters: [],
      requestBody: {},
      responses: {
        "200": {
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/CategoryOutput",
              },
            },
          },
        },
      },
    },
  },
  "/category/:categoryId": {
    get: {
      description: "Get Single Category",
      operationId: "GetSingleCategory",
      parameters: [],
      requestBody: {},
      responses: {
        "200": {
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/CategoryInput",
              },
            },
          },
        },
      },
    },
    patch: {
      security: [
        {
          bearerAuth: [],
        },
      ],
      description: "Update Single Category",
      operationId: "UpdateCategory",
      parameters: [
        {
          name: "categoryId",
          schema: {
            $ref: "#/components/schemas/id",
          },
          required: true,
          description: "Id of category to be updated",
        },
      ],
      requestBody: {},
      responses: {
        "200": {
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/CategoryInput",
              },
            },
          },
        },
        400: {
          description: "Unauthorization",
        },
      },
    },
  },
};
