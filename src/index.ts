import express from "express";
import cors from "cors";
import router from "./routes";
import { createConnection } from "typeorm";
import { DataBaseSource } from "./config/database"; 
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from '../swaggerConfig'; 

const app = express();

app.use(cors());
app.use(express.json());
app.use(router);

const PORT = process.env.PORT_PRODUCTION || 1313;

// Rota para a documentação do Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});

DataBaseSource.initialize()
  .then(() => {
    console.log("Banco inicializado com sucesso!");
  })
  .catch((err) => {
    console.error("Erro durante a inicialização do banco: ", err);
  });

export default app;
