/* Routes related to "product" use cases. */

import { Router } from "express";
const router = Router();
import * as helpers from "../helpers.js";
import * as product from "../data/product.js";

router.get("/", (req, res) => {
  res.redirect("/home");
});
router.route("/home").get(async (req, res) => {
  try {
    let products;
    const searchTerm = req.query.search;

    if (searchTerm) {
      products = await product.searchProducts(searchTerm);
    } else {
      products = await product.getAllProducts();
    }
    res.render("home", { 
      title: "Home",
      products: products, 
      search: searchTerm || "",
      user: req.session.user,
      store: req.session.store
    });

  } catch (e) {
    console.error(e);
    res.status(500).render("error", {
      title: "Error",
      errorClass: "error",
      text: "Failed to load home page. Please try again later.",
      user: req.session.user,
      store: req.session.store
    });
  }
});

router.route("/product/:id").get(async (req, res) => {
  try {
    const id = Number(req.params.id);
    const prod = await product.getProductById(id);
    res.render("product", {
      title: prod.product_name,
      product: prod,
      user: req.session.user,
      store: req.session.store
    });
  } catch (e) {
    console.error(e);
    res.status(404).render("error", {
      title: "Error",
      text: "The product could not be found.",
      user: req.session.user,
      store: req.session.store
    });
  }
});

router.route("/purchase/:id").post(async (req, res) => {
  if (req.session.store)
    return res.status(403).json({error: `You must be a regular user to do that`});
  if (!req.session.user)
    return res.status(403).json({error: `You must be logged in as a user to do that`});

  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      throw "The product could not be found.";
    }
    const prod = await product.getProductById(id);
    if (!prod) {
      throw "The product could not be found.";
    }
    if (prod.availability <= 0) {
      throw "Product is out of stock!";
    }
    const updatedProd = await product.updateProduct(id, {
      availability: prod.availability - 1
    });
    res.render("purchase", { 
      title: "Purchase Confirmation", 
      product: updatedProd,
      user: req.session.user,
      store: req.session.store
    });

  } catch (e) {
    console.error(e);
    res.status(400).render("error", {
      title: "Error",
      text: e.toString(),
      user: req.session.user,
      store: req.session.store
    });
  }
});

router.route("/search")

  .get(async (req, res) => {
    return res.render("search", {
      title: "Search",
      user: req.session.user,
      store: req.session.store,
      searchPage: true
    });
  })

  .post(async (req, res) => {
    try {
      req.body = helpers.checkObject({
        product_name: helpers.checkString,
        brand_name: helpers.checkString,
        category: (arg, argName) => {
          arg = helpers.checkString(arg, argName);
          if (!product.CATEGORIES.has(arg))
            throw `Argument "${argName}" is not a valid category`;
          return arg;
        },
        store_name: helpers.checkString
      }, req.body, "body");
    } catch (e) {
      return res.status(400).json({error: e});
    }

    let items = [];
    try {
      items = await product.searchProductsSearch(req.body);
    } catch (e) {
      console.error(e);
      return res.status(500).json({error: "Internal Server Error"});
    }

    return res.json(items);
  });

// router.route("/create")
//   .get(async (req, res) => {
//     return res.render("create-product", { title: "Create Product" });
//   })
//   .post(async (req, res) => {
//     try {
//       const data = helpers.checkObject({
//         store_id: helpers.checkPositiveInteger,
//         product_name: helpers.checkString,
//         brand_name: helpers.checkString,
//         category: helpers.checkString,
//         price: helpers.checkNonNegative,
//         availability: helpers.checkNonNegativeInteger
//       }, req.body, "body");

//       const product_id = await product.createProduct(
//         data.store_id,
//         data.product_name,
//         data.brand_name,
//         data.category,
//         data.price,
//         data.availability
//       );

//       return res.json({ message: "Product created successfully", product_id });
//     } catch (e) {
//       return res.status(400).json({ error: e });
//     }
//   });

export default router;
