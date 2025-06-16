/* Appends all of the routes to the Node application. */

import userRoutes from "./user.js";
import storeRoutes from "./store.js";
import productRoutes from "./product.js";
import profileRoutes from "./profile.js";
import {static as staticDir} from "express";

const configRoutes = (app) => {
  app.use("/", userRoutes);
  app.use("/", storeRoutes);
  app.use("/", productRoutes);
  app.use("/profile", profileRoutes);
  app.use("/public", staticDir("public"));
  app.use("/", (req, res) => {
    res.redirect("/home");
  });
  app.use("*", (req, res) => {
    res.status(404).render("error", {
      title: "Error",
      errorClass: "error",
      text: "Page not found",
      user: req.session.user,
      store: req.session.store
    });
  });
};

export default configRoutes;