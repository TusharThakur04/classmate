import express from "express";
import dotenv from "dotenv";
import flow from "./routes/flows.js";

dotenv.config();
const app = express();

app.use(express.json());
app.get("/", (req, res) => {
  res.send("hi");
});
app.use("/flows", flow);
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
