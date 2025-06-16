/* Methods for accessing + modifying the "product" table in our database. */

import * as helpers from "../helpers.js"
import {connect} from "../database/connection.js";

export const CATEGORIES = new Set([
  'Food',
  'Medical',
  'Hair Care',
  'Toiletries',
  'Dental',
  'Cleaning'
]);


export const createProduct = async (
  store_id,
  product_name,
  brand_name,
  category,
  price,
  availability
) => {
  store_id = helpers.checkPositiveInteger(store_id, "store_id");
  product_name = helpers.checkString(product_name, "product_name");
  brand_name = helpers.checkString(brand_name, "brand_name");

  category = helpers.checkString(category, "category");
  if (!CATEGORIES.has(category))
    throw `Argument "category" is not a valid category`;

  price = helpers.checkNonNegative(price, "price").toFixed(2);
  if (price === "0.00")
    throw `Argument "price" cannot be 0`;

  availability = helpers.checkNonNegativeInteger(availability, "availability");

  //Database
  let client = await connect();
  let res = await client.query(
  `INSERT INTO shipping.product
  (store_id, product_name, brand_name, category, price, availability)
  VALUES
  ($1, $2, $3, $4, $5, $6)
  RETURNING product_id;
  `, [store_id, product_name, brand_name, category, price, availability]);

  if (res.rows.length === 0)
    throw `Cannot create product`;
  return res.rows[0].product_id;
};
export async function updateProduct(productId, updatedFields) {
  if (!productId || typeof productId !== 'number') {
    throw new Error("Invalid product ID.");
  }
  if (typeof updatedFields !== 'object' || Object.keys(updatedFields).length === 0) {
    throw new Error("You must provide fields to update.");
  }

  const client = await connect();

  try {
    const setClauses = [];
    const values = [];
    let idx = 1;

    for (const field in updatedFields) {
      setClauses.push(`${field} = $${idx}`);
      values.push(updatedFields[field]);
      idx++;
    }

    values.push(productId);

    const query = `
      UPDATE shipping.product
      SET ${setClauses.join(', ')}
      WHERE product_id = $${idx}
      RETURNING *;
    `;

    const result = await client.query(query, values);

    if (result.rows.length === 0) {
      throw new Error("Product not found or not updated.");
    }

    return result.rows[0];
  } finally {
  }
}

export async function getAllProducts() {
  const client = await connect();
  try {
    const result = await client.query('SELECT * FROM shipping.product');
    return result.rows;
  } finally {
  }
}

export const getProductById = async (product_id) => {
  product_id = helpers.checkPositiveInteger(product_id, "product_id");

  let client = await connect();
  //The frontend will want the store data to display, so we get it now
  let res = await client.query(`
  WITH search_table AS (
    SELECT product_id, p.store_id, product_name, brand_name, category, price,
    availability, store_name, location
    FROM shipping.product p
    INNER JOIN shipping.store s ON p.store_id = s.store_id
  )
  SELECT * FROM search_table WHERE product_id = $1;
  `, [product_id]);

  if (res.rows.length === 0)
    throw `Cannot get product`;
  return res.rows[0];
};

export const searchProducts = async (searchTerm) => {
  if (typeof searchTerm !== 'string') {
    searchTerm = String(searchTerm); // 🔥 always convert to string first
  }
  searchTerm = helpers.checkString(searchTerm, "Search term");

  const client = await connect();
  try {
    const query = `
      WITH search_table AS (
        SELECT product_id, p.store_id, product_name, brand_name, category, price,
        availability, store_name, location
        FROM shipping.product p
        INNER JOIN shipping.store s ON p.store_id = s.store_id
      )
      SELECT * FROM search_table 
      WHERE LOWER(product_name) LIKE LOWER($1)
         OR LOWER(brand_name) LIKE LOWER($1);
    `;

    const result = await client.query(query, [`%${searchTerm}%`]);

    return result.rows;
  } finally {
  }
};

export const searchProductsSearch = async (searchObject) => {
  let {product_name, brand_name, category, store_name} = helpers.checkObject({
    product_name: helpers.checkString,
    brand_name: helpers.checkString,
    category: (arg, argName) => {
      arg = helpers.checkString(arg, argName);
      if (!CATEGORIES.has(arg))
        throw `Argument "${argName}" is not a valid category`;
      return arg;
    },
    store_name: helpers.checkString
  }, searchObject, "searchObject");

  //Build query based on supplied data
  let query = `
  WITH search_table AS (
    SELECT product_id, p.store_id, product_name, brand_name, category, price,
    availability, store_name, location
    FROM shipping.product p
    INNER JOIN shipping.store s ON p.store_id = s.store_id
  )
  SELECT * FROM search_table
  `;
  let terms = [];

  if (product_name !== undefined) {
    terms.push(product_name);
    query += ` WHERE product_name ILIKE ('%' || $${terms.length} || '%')`;
  }

  if (brand_name !== undefined) {
    terms.push(brand_name);
    query += (terms.length === 1 ? ` WHERE` : ` AND`) + ` brand_name ILIKE ('%' || $${terms.length} || '%')`;
  }

  if (category !== undefined) {
    terms.push(category);
    query += (terms.length === 1 ? ` WHERE` : ` AND`) + ` category = $${terms.length}`;
  }

  if (store_name !== undefined) {
    terms.push(store_name);
    query += (terms.length === 1 ? ` WHERE` : ` AND`) + ` store_name ILIKE ('%' || $${terms.length} || '%')`;
  }

  query += ";";

  let client = await connect();
  let res = await client.query(query, terms);

  return res.rows;
};

