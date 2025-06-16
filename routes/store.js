/* Routes related to "store" use cases. */

import { Router } from "express";
const router = Router();
import * as store from "../data/store.js";
import * as product from "../data/product.js";
import * as helpers from "../helpers.js";

router.route("/store/signup")

  .get(async (req, res) => {
    //Prevent being a user and a store at the same time
    if (req.session.user) {
      return res.status(400).render("error", {
        title: "Error",
        errorClass: "Bad Request",
        text: `You are already logged in as a user`,
        user: req.session.user
      });
    }
    if (req.session.store)
      return res.redirect("/store/profile");

    return res.render("signup-store", {
      title: "Store Signup",
    });
  })

  .post(async (req, res) => {
    if (req.session.user)
      return res.status(400).json({error: `You are already logged in as a user`});
    if (req.session.store)
      return res.status(400).json({error: `You are already logged in`});

    try {
      const data = helpers.checkObject({
        username: helpers.checkString,
        password: helpers.checkString,
        store_name: helpers.checkString,
        location: helpers.checkString
      }, req.body, "body");

      const store_id = await store.createStore(
        data.username, data.password, data.store_name, data.location
      );

      //Authorize store
      let store_account = await store.getStoreById(store_id);
      req.session.store = store_account;

      return res.json({ message: "Store created", store_id });
    } catch (e) {
      return res.status(400).json({ error: e });
    }
  });

router.route("/store/login")

  .get(async (req, res) => {
    if (req.session.user) {
      return res.status(400).render("error", {
        title: "Error",
        errorClass: "Bad Request",
        text: `You are already logged in as a user`,
        user: req.session.user
      });
    }
    if (req.session.store)
      return res.redirect("/store/profile");

    try {
      return res.render("login-store", {
        title: "Store Login",
      });
    } catch (e) {
      return res.status(500).json({error: e.message});
    }
  })

  .post(async (req, res) => {
    if (req.session.user)
      return res.status(400).json({error: `You are already logged in as a user`});
    if (req.session.store)
      return res.status(400).json({error: `You are already logged in`});

    try {
      const { username, password } = req.body;

      const storeData = await store.getStoreFromCredentials(username, password);
      req.session.store = storeData; //Now authorized

      return res.status(200).json(storeData);
    } catch (e) {
      return res.status(400).json({ error: e });
    }
  });

router.route("/store/profile").get(async (req, res) => {
  if (req.session.user) {
    return res.status(403).render("error", {
      title: "Error",
      errorClass: "Forbidden",
      text: `You must be a store to do that`,
      user: req.session.user
    });
  }
  if (!req.session.store)
    return res.redirect("/store/login");

  //TODO: FINISH THIS!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  return res.render("profile-store", {
    title: "Store Profile",
    store: req.session.store
  });
});

router.route("/store/profile/update").post(async (req, res) => {
  if (req.session.user)
    return res.status(403).json({error: `You must be a store to do that`});
  if (!req.session.store)
    return res.status(403).json({error: `You must be logged in as a store to do that`});

  let body = req.body;
  for (let key in body) {
    if (body[key] === "")
      body[key] = undefined;
  }

  try {
    body = helpers.argObject({
      username: helpers.checkString,
      password: helpers.checkString,
      store_name: helpers.checkString,
      location: helpers.checkString
    }, {
      extraneous: true,
      discardExtra: true,
      numRequired: 1,
      prependArgName: false
    })(body, "body");
  } catch (e) {
    return res.status(400).render("error", {
      title: "Error",
      message: e,
      user: req.session.user,
      store: req.session.store
    });
  }

  try {
    store.updateStore(req.session.store.store_id, body);
  } catch (e) {
    console.error(e);
    return res.status(500).render("error", {
      title: "Error",
      message: "Internal Server Error",
      user: req.session.user,
      store: req.session.store
    });
  }

  for (let key in body) {
    if (body[key] !== undefined)
      req.session.store[key] = body[key];
  }

  return res.redirect("/store/profile");
});

router.route("/store/upload")

  .get(async (req, res) => {
    if (req.session.user) {
      return res.status(403).render("error", {
        title: "Error",
        errorClass: "Forbidden",
        text: `You must be a store to do that`,
        user: req.session.user
      });
    }
    if (!req.session.store)
      return res.redirect("/store/login");

    return res.render("create-product", {
      title: "Create Product",
      store: req.session.store
    });
  })

  .post(async (req, res) => {
    if (req.session.user)
      return res.status(403).json({error: `You must be a store to do that`});
    if (!req.session.store)
      return res.status(403).json({error: `You must be logged in as a store to do that`});

    try {
      const data = helpers.checkObject({
        store_id: helpers.checkPositiveInteger,
        product_name: helpers.checkString,
        brand_name: helpers.checkString,
        category: (arg, argName) => {
          arg = helpers.checkString(arg, argName);
          if (!product.CATEGORIES.has(arg))
            throw `Invalid category`;
          return arg;
        },
        price: helpers.checkNonNegative,
        availability: helpers.checkNonNegativeInteger
      }, req.body, "body");

      const product_id = await product.createProduct(
        data.store_id,
        data.product_name,
        data.brand_name,
        data.category,
        data.price,
        data.availability
      );

      return res.json({ message: "Product created successfully", product_id });
    } catch (e) {
      return res.status(400).json({ error: e });
    }
  });

router.route('/store/signout').get(async (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send('Unable to log out');
    }
    res.render('signout', {
      message: 'You have been successfully logged out.',
      loginUrl: '/store/login',
    });
  });
});

export default router;