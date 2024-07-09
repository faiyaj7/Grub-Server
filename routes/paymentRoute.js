import express from "express";
import { orderProducts } from "../controllers/paymentController.js";

const router = express.Router();

router.post("/create-checkout-session", orderProducts);


export default router;