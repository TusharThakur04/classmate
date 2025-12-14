import "dotenv/config";
import express from "express";
import cors from "cors";
import userRoute from "./routes/userRoute.js";
import flowRoute from "./routes/flowRoute.js";
import oAuth from "./routes/oAuth.js";
import { clerkMiddleware } from "@clerk/express";

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(clerkMiddleware());

app.use("/users", userRoute);

app.use("/flows", flowRoute);

app.use("/auth", oAuth);

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
