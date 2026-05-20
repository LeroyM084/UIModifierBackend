import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "UIModifier Backend API",
      version: "1.0.0",
      description: "API pour gérer les stylesheets et les utilisateurs",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Development server",
      },
      {
        url: "https://api.uimodifier.com",
        description: "Production server",
      },
    ],
    components: {
      schemas: {
        User: {
          type: "object",
          properties: {
            id: { type: "number" },
            username: { type: "string" },
            email: { type: "string", format: "email" },
            password: { type: "string" },
            createdAt: { type: "string", format: "date-time" },
          },
        },
        Stylesheet: {
          type: "object",
          properties: {
            id: { type: "number" },
            userId: { type: "number" },
            name: { type: "string" },
            cssContent: { type: "string" },
            isActive: { type: "boolean" },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time", nullable: true },
            targets: {
              type: "array",
              items: { $ref: "#/components/schemas/Target" },
            },
          },
        },
        Target: {
          type: "object",
          properties: {
            id: { type: "number" },
            stylesheetId: { type: "number" },
            urlPattern: { type: "string" },
          },
        },
        Health: {
          type: "object",
          properties: {
            status: { type: "string", enum: ["ok"] },
            timestamp: { type: "string", format: "date-time" },
          },
        },
        Error: {
          type: "object",
          properties: {
            error: { type: "string" },
            statusCode: { type: "number" },
          },
        },
      },
    },
  },
  apis: ["./src/routes/**/*.ts"],
};

export const swaggerSpec = swaggerJsdoc(options);

export const swaggerUiOptions = {
  customCss: `
    html {
      margin: 0 !important;
      padding: 0 !important;
      height: 100% !important;
    }
    body {
      margin: 0 !important;
      padding: 0 !important;
      height: 100% !important;
      overflow: hidden !important;
    }
    #swagger-ui {
      height: 100vh !important;
      width: 100% !important;
      overflow: auto !important;
    }
  `,
  customSiteTitle: "UIModifier API Documentation",
  swaggerOptions: {
    persistAuthorization: true,
    displayOperationId: false,
  },
};
