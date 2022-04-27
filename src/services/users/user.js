import express from "express";
import usersmodel from "../../../model/usersmodel.js";
import productsmodel from "../../../model/productsmodel.js";
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
// =========================================================
userRouter.post("/:userId/buyProduct", async (req, res, next) => {
  try {
    const product = await productsmodel.findById(req.body.productId, {
      _id: 0,
    });
    const convertProduct = { ...product.toObject(), purchaseDate: new Date() };
    const modify = await usersmodel.findByIdAndUpdate(
      req.params.userId,
      {
        $push: { buyProduct: convertProduct },
      },
      { new: true, runValidators: true }
    );
    res.send(modify);
  } catch (error) {
    console.log(error);
    next(error);
  }
});
// ========================================================
userRouter.get("/:userId/buyProduct", async (req, res, next) => {
  try {
    const user = await usersmodel.findById(req.params.userId);
    res.send(user.buyProduct);
  } catch (error) {}
});
// =======================================================
userRouter.get("/:userId/buyProduct/:productId", async (req, res, next) => {
  try {
    const user = await usersmodel.findById(req.params.userId);
    const speProduct = user.buyProduct.find(
      (product) => product._id.toString() === req.params.productId
    );
    res.send(speProduct);
  } catch (error) {}
});
// ==========================================================
userRouter.put("/:userId/buyProduct/:productId", async (req, res, next) => {
  try {
    const user = await usersmodel.findById(req.params.userId);
    const index = user.buyProduct.findIndex(
      (product) => product._id.toString() === req.params.productId
    );
    user.buyProduct[index] = {
      ...user.buyProduct[index].toObject(),
      ...req.body,
    };
    await user.save();
    res.send(user);
  } catch (error) {
    next(error);
  }
});
// ==========================================================
userRouter.delete("/:userId/buyProduct/:productId", async (req, res, next) => {
  try {
    const modify = await usersmodel.findByIdAndUpdate(
      req.params.userId,
      { $pull: { buyProduct: { _id: req.params.productId } } },
      {}
    );
    res.send(modify);
  } catch (error) {}
});
// ==========================================================
export default userRouter;
