import express from "express";
import usersmodel from "../../../model/usersmodel.js";
// ======================================================
const userRouter = express.Router();
// ======================================================
userRouter.post("/", async (req, res, next) => {
  try {
    const newUser = await usersmodel(req.body);
    const { _id } = await newUser.save();
    res.send({ _id });
  } catch (error) {
    console.log(error);
    next(error);
  }
});
// ========================================================
userRouter.get("/", async (req, res, next) => {
  try {
    const getUser = await usersmodel.find();
    res.send(getUser);
  } catch (error) {
    console.log(error);
    next(error);
  }
});
// ========================================================
userRouter.get("/:userId", async (req, res, next) => {
  try {
    const findUser = await usersmodel.findById(req.params.userId);
    res.send(findUser);
  } catch (error) {
    console.log(error);
    next(error);
  }
});
// ========================================================
userRouter.put("/:userId", async (req, res, next) => {
  try {
    const userUpdate = await usersmodel.findByIdAndUpdate(
      req.params.userId,
      req.body,
      { new: true, runValidators: true }
    );
    res.send(userUpdate);
  } catch (error) {
    console.log(error);
    next(error);
  }
});
// ========================================================
userRouter.delete("/:userId", async (req, res, next) => {
  try {
    const deleteUser = await usersmodel.findByIdAndDelete(req.params.userId);
    res.send();
  } catch (error) {
    console.log(error);
    next(error);
  }
});
// ========================================================
export default userRouter;
