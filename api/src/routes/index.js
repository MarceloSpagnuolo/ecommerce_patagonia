const { Router } = require("express");
// import all routers;
const productRouter = require("./product.js");
const categoryRouter = require("./category.js");
const relationRouter = require("./relations.js");
const userRouter = require("./user");
const orderRouter = require("./order");
const reviewRouter = require("./reviews");
const multerRouter = require("./multer")
const authRouter = require("./autentication")
const mercadoPagoRouter = require("./mercadopago")

const router = Router();

// load each router on a route
// i.e: router.use('/auth', authRouter);
// router.use('/auth', authRouter);
router.use("/products", productRouter);
router.use("/categories", categoryRouter);
router.use("/relations", relationRouter);
router.use("/users", userRouter);
router.use("/orders", orderRouter);
router.use("/reviews", reviewRouter);
router.use("/multer", multerRouter);
router.use("/auth", authRouter)
router.use("/mepa", mercadoPagoRouter)


module.exports = router;
