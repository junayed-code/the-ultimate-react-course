import cors from "cors";
import express from "express";
import { wait, createHttpError } from "./utils.js";

/**
 *
 * @param {"GET" | "POST" | "PATCH" | "PUT" | "DELETE"} method
 */
const getStatusCode = (method) => {
  switch (method) {
    case "DELETE":
      return 204;

    case "POST":
      return 201;

    case "GET":
    case "PUT":
    case "PATCH":
    default:
      return 200;
  }
};

/**
 *
 * @param {import("./lib/JSONDatabase").JSONDatabase} db
 * @param {{wait: number}} options
 * @returns {Express}
 */
export const createApp = (db, options = { wait: 0 }) => {
  const _wait = Number(options.wait) || 0;
  const app = express();

  // Middlewares
  app.use(cors({ origin: "*" }));
  app.use(express.json());

  app.get("/", (req, res) => {
    res.status(200).json({
      data: null,
      status: "success",
      message: "This is root path of the server",
    });
  });

  app
    .route("/:name")
    .get((req, res, next) => {
      const { name } = req.params;
      res.locals.data = db.find(name);
      next();
    })
    .post(async (req, res, next) => {
      const { name } = req.params;
      if (typeof req.body === "object" && req.body !== null) {
        res.locals.data = await db.create(name, req.body);
      }
      next();
    });

  app
    .route("/:name/:id")
    .get((req, res, next) => {
      const { name, id } = req.params;
      res.locals.data = db.findById(name, id);
      next();
    })
    .delete(async (req, res, next) => {
      const { name, id } = req.params;
      res.locals.data = await db.deleteById(name, id);
      next();
    });

  app.use((req, res, next) => {
    const { data } = res.locals;
    if (!data) {
      next(createHttpError(404, "No data found!"));
    } else {
      wait(_wait).then(() => res.status(getStatusCode(req.method)).json(data));
    }
  });

  // Error handler middleware
  app.use((err, _req, res, _next) => {
    const { status, message } = err;
    res
      .status(status || 500)
      .json({ status: status ? "fail" : "error", message });
  });

  return app;
};
