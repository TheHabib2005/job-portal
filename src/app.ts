import express, { Application } from "express";
import routes from "./routes";

const app: Application = express();
const port = 8000;

app.use(express.json());
app.use("/api", routes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
