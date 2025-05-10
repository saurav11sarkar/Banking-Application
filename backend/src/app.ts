import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { notFoundError } from "./middlewares/404Handling";
import config from "./config";
import router from "./routes/routes";

const app = express();

app.use(cors({ origin: ["http://localhost:3000"], credentials: true }));
app.use(express.json({ limit: "15kb" }));
app.use(express.urlencoded({ extended: true, limit: "15kb" }));
app.use(cookieParser());

app.use("/api/v1", router);

app.get("/", (req: Request, res: Response) => {
  res
    .status(200)
    .send(
      "<h2 style='color:green; text-align:center;'>Server is running 💳</h2>"
    );
});

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
