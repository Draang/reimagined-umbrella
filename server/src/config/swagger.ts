import swaggerJSDoc from "swagger-jsdoc";
import { SwaggerUiOptions } from "swagger-ui-express";
const options: swaggerJSDoc.Options = {
  swaggerDefinition: {
    openapi: "3.0.2",
    tags: [
      {
        name: "Products",
        description: "API operationns related top products",
      },
    ],
    info: {
      title: "REST API Node.js / Express / TypeScript",
      version: "1.0.0",
      description: "API Docs for products",
    },
  },
  apis: ["./src/router.ts"],
};
const swaggerSpec = swaggerJSDoc(options);

export const swaggerUiOptions: SwaggerUiOptions = {
  customCss: `
    .topbar-wrapper .link{
            content: url('https://img.poki-cdn.com/cdn-cgi/image/quality=78,width=1200,height=1200,fit=cover,f=png/86923487e864bb618cb824e83cc68925.png');
            max-height: 80px;
            width: auto;
    }
    `,
  customSiteTitle: "Documentacion REST API",
};
export default swaggerSpec;
