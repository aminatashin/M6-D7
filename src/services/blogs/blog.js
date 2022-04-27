import express from "express";
import createError from "http-errors";
import blogsmodel from "../../../model/blogsmodel.js";
import commentsmodel from "../../../model/commentsmodel.js";
import usersmodel from "../../../model/usersmodel.js";

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
// =========================embedding=========================
blogRouter.post("/:blogId/customerComment", async (req, res, next) => {
  try {
    const comment = await commentsmodel.findById(req.body.commentId, {
      _id: 0,
    });
    const commentConvert = { ...comment.toObject(), commentDate: new Date() };
    const modifiedBlog = await blogsmodel.findByIdAndUpdate(
      req.params.blogId,
      { $push: { customerComment: commentConvert } },
      { new: true, runValidators: true }
    );
    res.send(modifiedBlog);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

// ==============================================
blogRouter.get("/:blogId/customerComment", async (req, res, next) => {
  try {
    const blog = await blogsmodel.findById(req.params.blogId);
    res.send(blog.customerComment);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

// ==============================================
blogRouter.get(
  "/:blogId/customerComment/:commentId",
  async (req, res, next) => {
    try {
      const blog = await blogsmodel.findById(req.params.blogId);
      if (blog) {
        const comments = blog.customerComment.find(
          (comment) => comment._id.toString() === req.params.commentId
        );
        res.send(comments);
      } else {
        next(createError(404));
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
);

// ==============================================
blogRouter.put(
  "/:blogId/customerComment/:commentId",
  async (req, res, next) => {
    try {
      const blog = await blogsmodel.findById(req.params.blogId);
      const index = blog.customerComment.findIndex(
        (comment) => comment._id.toString() === req.params.commentId
      );
      blog.customerComment[index] = {
        ...blog.customerComment[index].toObject(),
        ...req.body,
      };
      await blog.save();
      res.send(blog);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
);

// ==============================================
blogRouter.delete(
  "/:blogId/customerComment/:commentId",
  async (req, res, next) => {
    try {
      const modifie = await blogsmodel.findByIdAndUpdate(
        req.params.blogId,
        { $pull: { customerComment: { _id: req.params.commentId } } },
        { new: true }
      );
      res.send(modifie);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
);

// ==============================================

export default blogRouter;
