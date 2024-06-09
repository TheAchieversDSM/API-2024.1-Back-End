import swaggerJSDoc from 'swagger-jsdoc';

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Katsuni API',
      version: '1.0.0',
      description: 'API projeto análise de avaliações de produtos',
    },
    servers: [
      {
        url: 'http://localhost:1313', 
      },
    ],
    tags: [
        { name: 'Products', description: 'Rotas para gerenciar produtos' },
        { name: 'Summary', description: 'Rotas para gerenciar categorias de produtos' },
        { name: 'Imports', description: 'Rotas para gerenciar uploads dos arquivos' },
        { name: 'User', description: 'Rotas para gerenciar usários' },
    ],
  },
  apis: ['./src/routes/*.ts'], 
  
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
