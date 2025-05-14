import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { notFoundError } from "./middlewares/404Handling";
import config from "./config";
import router from "./routes/routes";
import morgan from "morgan";
// import SSLCommerzPayment from "sslcommerz-lts";
import catchAsync from "./utils/catchAsync";

const app = express();

app.use(cors({ origin: ["http://localhost:3000"], credentials: true }));
app.use(express.json({ limit: "15kb" }));
app.use(express.urlencoded({ extended: true, limit: "15kb" }));
app.use(cookieParser());
app.use(morgan("dev"));

app.use("/api/v1", router);

app.get("/", (req: Request, res: Response) => {
  res
    .status(200)
    .send(
      "<h2 style='color:green; text-align:center;'>Server is running 💳</h2>"
    );
});


const store_id = config.STORE_ID!
const store_passwd = config.STORE_PASSWD!
const is_live = config.IS_LIVE!

app.post("/api/v1/order", catchAsync(async(req , res)=>{
  res.status(200).json({
    success: true,
    message: "Order placed successfully",
    data: req.body
  })
}))

app.use(notFoundError);
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  res.status(statusCode).json({
    success: false,
    message,
    error: err,
    stack: config.NODE_ENV === "DEVELOPER" ? err.stack : undefined,
  });
});

export default app;
