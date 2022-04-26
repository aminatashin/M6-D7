import express from "express";
import blogsmodel from "../../../model/blogsmodel.js";

// ==============================================
const blogRouter = express.Router();

// ==============================================
blogRouter.post("/", async (req, res, next) => {
  try {
    const newBlog = await blogsmodel(req.body);
    const { _id } = await newBlog.save();
    res.send({ _id });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

// ==============================================
blogRouter.get("/", async (req, res, next) => {
  try {
    const getBlogs = await blogsmodel.find();
    res.send(getBlogs);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

// ==============================================
blogRouter.get("/:blogId", async (req, res, next) => {
  try {
    const findBlog = await blogsmodel.findById(req.params.blogId);
    res.send(findBlog);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

// ==============================================
blogRouter.put("/:blogId", async (req, res, next) => {
  try {
    const blogUpdate = await blogsmodel.findByIdAndUpdate(
      req.params.blogId,
      req.body,
      { new: true, runValidators: true }
    );
    res.send(blogUpdate);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

// ==============================================
blogRouter.delete("/:blogId", async (req, res, next) => {
  try {
    const deleteBlog = await blogsmodel.findByIdAndDelete(req.params.blogId);
    res.send(deleteBlog);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

// ==============================================

export default blogRouter;
