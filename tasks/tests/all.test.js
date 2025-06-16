/*
  Test suite for miscallenous tests. Feel free to write any uncategorized tests
  here.
*/

import {disconnect} from "../../database/connection.js";
import * as product from "../../data/product.js";

afterAll(async () => {
  await disconnect();
});


test("searchProducts good 1", async () => {
  let res = await product.searchProducts({
    product_name: "oRgAnIC"
  });
  expect(res.length).toBeGreaterThan(0);
});

test("searchProducts good 2", async () => {
  let res = await product.searchProducts({
    product_name: "       rGANIC             ",
    brand_name: "NutriBlend    ",
    category: "Food",
    store_name: "    SuperMart On"
  });
  expect(res.length).toBe(1);
});

test("searchProducts good 3", async () => {
  let res = await product.searchProducts({
    category: "   Toiletries",
    product_name: " teeth "
  });
  expect(res.length).toBe(0);
});