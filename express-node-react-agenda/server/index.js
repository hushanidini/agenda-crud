import express from 'express';
import bodyParser from "body-parser";
import cors from "cors";
import eventRoutes from "./routes/events.js";

const app = express();
const port = 50000;

app.use(bodyParser.json());
app.use(cors());

app.use("/",eventRoutes);

app.get("/", (req, res) => res.send("Hello from express"));
app.all("*", (req, res)=>res.send("That route doesn't exit"))
app.listen(port,()=>console.log(`Server is listening on port: http:localhost:${port}`));