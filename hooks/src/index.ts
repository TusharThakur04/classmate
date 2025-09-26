import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import flow from "./routes/flows"

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  res.send("hi");
});
app.use("/flows",flow)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
