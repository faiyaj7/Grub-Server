import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";

import paymentRoute from "./routes/paymentRoute.js";

// console.log(process.env.STRIPE_SECRET);
// uncaught exception
// if there are something undefined then the server will be close
process.on("uncaughtException", (e) => {
  process.exit(1);
});

const app = express();
app.use(cors());

app.use(express.json());

app.use("/order", paymentRoute);

const port = process.env.PORT || 3000;
console.log(port);
let server = app.listen(port, () =>
  console.log(`Listening at http://localhost:${port}`)
);
// unhandled Rejection
// if thera are issue like mongo db name there comes an error instead of closing down the server
// so if there are such issues we will close the server

process.on("unhandledRejection", (e) => {
  console.log(`Error : ${e.message}`);
  console.log("Shutting down the server");
  server.close(() => {
    process.exit(1);
  });
});
