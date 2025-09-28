import express from "express";
import cors from "cors";
import userRoute from "./routes/userRoute";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/users", userRoute);

// app.use("/flow", flowRoute);

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
