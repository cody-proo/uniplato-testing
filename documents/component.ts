export const components = {
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        description: "JWT Authorization header using the Bearer scheme.",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
    schemas: {
      id: {
        type: "number",
        description: "An id of a category or user",
      },
      Category: {
        type: "object",
        properties: {
          id: {
            type: "number",
            description: "Category identification number",
            example: 1,
          },
          title: {
            type: "string",
            description: "Category's title",
            example: "Category1",
          },
          amount: {
            type: "number",
            description: "The number of per category",
            example: 0,
          },
        },
      },
      User: {
        type: "object",
        properties: {
          id: {
            type: "number",
            description: "User identification number",
            example: 1,
          },
          email: {
            type: "string",
            description: "User's title",
            example: "example@gmai.com",
          },
          password: {
            type: "string",
            description:
              "The Password for accounts and it should not be less than 8 characters",
            example: "123456789",
          },
          bio: {
            type: "string",
            description:
              "The bio of profile The default value is 'Not Provided Bio'",
            example: "Hi ,Im a codypro",
          },
          role: {
            type: "enum",
            description: "The role of User it can Be ADMIN OR COLLABORATOR",
            example: "COLLABORATOR",
          },
          createdAt: {
            type: "Date",
            description: "The timestamps of when this user create",
            example: "2022-09-20T08:53:32.657Z",
          },
          updatedAt: {
            type: "Date",
            description: "The timestamps of the last time that user updated",
            example: "2022-09-20T08:53:32.657Z",
          },
        },
      },
      CategoryInput: {
        type: "object",
        properties: {
          title: {
            type: "string",
            description: "Category's title",
            example: "Category1",
          },
          amount: {
            type: "number",
            description: "The number of per category",
            example: 0,
          },
        },
      },
      token: {
        type: "object",
        properties: {
          token: {
            type: "string",
            description: "Token's User ",
          },
        },
      },
      SingupInput: {
        type: "object",
        properties: {
          email: {
            type: "string",
            description: "User's title",
            example: "example@gmai.com",
          },
          password: {
            type: "string",
            description:
              "The Password for accounts and it should not be less than 8 characters",
            example: "123456789",
          },
          bio: {
            type: "string",
            description:
              "The bio of profile The default value is 'Not Provided Bio'",
            example: "Hi ,Im a codypro",
          },
          role: {
            type: "enum",
            description: "The role of User it can Be ADMIN OR COLLABORATOR",
            example: "COLLABORATOR",
          },
        },
      },
      LoignInput: {
        type: "object",
        properties: {
          email: {
            type: "string",
            description: "User's title",
            example: "example@gmai.com",
          },
          password: {
            type: "string",
            description:
              "The Password for accounts and it should not be less than 8 characters",
            example: "123456789",
          },
        },
      },
      Error: {
        type: "object",
        properties: {
          message: {
            type: "string",
          },
        },
      },
      CategoryOutput: {
        type: "array",
        items: {
          type: "object",
          properties: {
            title: {
              type: "string",
              description: "Category's title",
              example: "Category1",
            },
            amount: {
              type: "number",
              description: "The number of per category",
              example: 0,
            },
          },
        },
      },
    },
  },
};
