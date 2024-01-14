import express from "express";
import mongoose from "mongoose";
import cors from "cors";
// import path from "path";

import routes from "./src/routes";

import { DB_CONFIG } from "./src/constants/configs";
import CheckoutController from "./src/controllers/checkout.controller";

// express app
const app = express();

// webhook
app.post(
  "/checkout/webhook",
  express.raw({ type: "application/json" }),
  CheckoutController.forwardWebhook,
);

// middleware
app.use(express.json());

const corsOptions = {
  origin: true,
  credentials: true,
};

app.options("*", cors(corsOptions));

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:3001",
      "http://54.168.239.97",
    ],
  }),
);

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.use("/api", routes);

// // Serve frontend
// if (SERVER_CONFIG.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "../../frontend-store/build")));

//   app.get("/*", (req, res) =>
//     res.sendFile(
//       path.resolve(__dirname, "../", "frontend-store", "build", "index.html"),
//     ),
//   );
// } else {
//   app.get("/", (req, res) => res.send("Please set to production"));
// }

mongoose
  .connect(DB_CONFIG.MONGO_URI!)
  .then(() => {
    app.listen(4000, () => {
      console.log("Listening on port 4000!");
    });
  })
  .catch((error) => {
    console.log(error);
  });
