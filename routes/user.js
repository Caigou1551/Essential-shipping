/* Routes related to "user" use cases. */

import { Router } from "express";
const router = Router();
import * as helpers from "../helpers.js";
import * as user from "../data/user.js";

router.route("/signup")
  .get(async (req, res) => {
    //Prevent being a user and a store at the same time
    if (req.session.store) {
      return res.status(400).render("error", {
        title: "Error",
        errorClass: "Bad Request",
        text: `You are already logged in as a store`,
        store: req.session.store
      });
    }
    if (req.session.user)
      return res.redirect("/profile");

    return res.render("signup", {
      title: "User Signup"
    });
  })

  .post(async (req, res) => {
    if (req.session.store)
      return res.status(400).json({error: `You are already logged in as a store`});
    if (req.session.user)
      return res.status(400).json({error: `You are already logged in`});

    try {
      const data = helpers.checkObject({
        username: helpers.checkString,
        password: helpers.checkString,
        first_name: helpers.checkString,
        last_name: helpers.checkString,

        cc_info: (arg, argName) => {
          if (arg !== null)
            arg = helpers.checkString(arg, argName);
          return arg;
        },

        shipping_address: (arg, argName) => {
          if (arg !== null)
            arg = helpers.checkString(arg, argName);
          return arg;
        }
      }, req.body, "body");

      const userId = await user.createUser(
        data.username, data.password,
        data.first_name, data.last_name,
        data.cc_info, data.shipping_address
      );

      //Authorize user
      let account = await user.getUserById(userId);
      req.session.user = account;

      return res.json({ message: "User created", user_id: userId });
    } catch (e) {
      console.log(e);
      return res.status(400).json({ error: e });
    }
  });

router.route("/login")

  .get(async (req, res) => {
    if (req.session.store) {
      return res.status(400).render("error", {
        title: "Error",
        errorClass: "Bad Request",
        text: `You are already logged in as a store`,
        store: req.session.store
      });
    }
    if (req.session.user)
      return res.redirect("/profile");

    try {
      return res.render("login", {
        title: "User Login",
      });
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  })

  .post(async (req, res) => {
    if (req.session.store)
      return res.status(400).json({error: `You are already logged in as a store`});
    if (req.session.user)
      return res.status(400).json({error: `You are already logged in`});

    try {
      const data = helpers.checkObject({
        username: helpers.checkString,
        password: helpers.checkString
      }, req.body, "body");

      const account = await user.getUserFromCredentials(data.username, data.password);
      req.session.user = account; //Now authorized

      return res.json(account);
    } catch (e) {
      return res.status(400).json({error: e});
    }
  });

router.route("/profile").get(async (req, res) => {
  if (req.session.store) {
    return res.status(403).render("error", {
      title: "Error",
      errorClass: "Forbidden",
      text: `You must be a regular user to do that`,
      store: req.session.store
    });
  }
  if (!req.session.user)
    return res.redirect("/login");

  return res.render("profile", {
    title: "User Profile",
    user: req.session.user
  });
});

router.route('/signout').get(async (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send('Unable to log out');
    }
    res.render('signout', {
      message: 'You have been successfully logged out.',
      loginUrl: '/login',
    });
  });
});
export default router;