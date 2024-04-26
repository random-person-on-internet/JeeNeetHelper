import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

// configure cors
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

// set middlewares
// for json -> set limit to 16kb
app.use(
  express.json({
    limit: "16kb",
  })
);

// for url -> might be nested (extended) and limit to 16kb
app.use(
  express.urlencoded({
    extended: true,
    limit: "16kb",
  })
);

// for files/folders -> save in public folder
app.use(express.static("public"));

// configure cookie-parser
app.use(cookieParser());

export default app;
