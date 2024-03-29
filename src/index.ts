import express from "express";
import cors from "cors";

// DataBaseSource.initialize()
//   .then(() => {
//     console.log("Banco inicializado com sucesso!");
//   })
//   .catch((err) => {
//     console.error("Erro durante a inicialização do banco: ", err);
//   });


const app = express();

let port = process.env.PORT_PRODUCTION || 5000;

app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});

app.use(cors());
app.use(express.json());
app.use(router);

export default app;