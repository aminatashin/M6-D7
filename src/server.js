import express from "express";
import mongoose from "mongoose";
import listEndpoints from "express-list-endpoints";
import cors from "cors";
import blogRouter from "../src/services/blogs/blog.js";
import userRouter from "./services/users/user.js";

// =======================================================
const server = express();
const port = process.env.PORT || 3001;

// ========================================================
server.use(cors());
server.use(express.json());

// ========================================================
server.use("/blogs", blogRouter);
server.use("/users", userRouter);
// =========================================================
mongoose.connect(process.env.MONGO_CONNECTION);
mongoose.connection.on("connected", () => {
  console.log("MONGOOSE IS CONNECTED");
  server.listen(port, () => {
    console.table(listEndpoints(server));
    console.log(`server is runing ${port}`);
  });
});
