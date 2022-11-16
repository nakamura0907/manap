import cors from "cors";
import http from "http";
import express from "express";
import config from "@config/index";
import errorHandling from "@frameworks/webserver/middlewares/errorHandling";
import passport from "@/features/core/auth/passport";
import {
  authRouter,
  projectMemberRouter,
  projectRouter,
} from "@/frameworks/webserver/router";

const app = express();
const server = http.createServer(app);

// サーバー設定
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const options: cors.CorsOptions = {
  origin: config.server.cors.origin,
  optionsSuccessStatus: 200,
};
app.use(cors(options));

app.use(passport.initialize());

// ルーティング
app.use("/api/v1", authRouter(express));
app.use("/api/v1/projects", projectRouter(express));
app.use("/api/v1/projects/:projectId", projectMemberRouter(express));

// エラーハンドリング
errorHandling(app);

module.exports = server;
