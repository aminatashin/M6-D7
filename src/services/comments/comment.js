import express from "express";
import commentsmodel from "../../../model/commentsmodel.js";
// ===============================================
const commentRouter = express.Router();
commentRouter.post("/", async (req, res, next) => {
  try {
    const newComment = await commentsmodel(req.body);
    const { _id } = await newComment.save();
    res.send({ _id });
  } catch (error) {
    console.log(error);
    next(error);
  }
});
commentRouter.get("/", async (req, res, next) => {
  try {
    const comment = await commentsmodel.find();
    res.send(comment);
  } catch (error) {
    next(error);
  }
});
commentRouter.get("/:commentId", async (req, res, next) => {
  try {
    const findComment = await commentsmodel.findById(req.params.commentId);
    res.send(findComment);
  } catch (error) {
    next(error);
  }
});
commentRouter.put("/", async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
});
commentRouter.delete("/", async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
});
export default commentRouter;
