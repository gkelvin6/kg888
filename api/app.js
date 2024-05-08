
import express from "express";
import postRoute from "./routes/post.route.js";
import authRoute from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import testRoute from "./routes/test.route.js";

const app = express();


app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());
app.set('trust proxy', ['13.228.225.19', '18.142.128.26', '54.254.162.138'])
app.use(cookieParser());

app.use("/api/posts", postRoute);
app.use("/api/auth",authRoute);
app.use("/api/test",testRoute);

app.listen(8800, () =>
  console.log('KG888 listening on port 8800!'),
);
