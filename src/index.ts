
import express from "express";
import cors from "cors";
import router from "./routes";
import { createConnection } from "typeorm";
import { DataBaseSource } from "./config/database"; 

const app = express();

app.use(cors());
app.use(express.json());
app.use(router);

const PORT = process.env.PORT_PRODUCTION || 1313;


createConnection({
  ...DataBaseSource.options,
})
  .then(() => {
    console.log("Banco de dados conectado com sucesso!");
    app.listen(PORT, () => {
      console.log(`App is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Erro ao conectar ao banco de dados:", error);
  });

export default app;
