/* Methods for accessing + modifying the "store" table in our database. */

import {compare} from "bcrypt";
import * as helpers from "../helpers.js";
import {connect} from "../database/connection.js";

export const createStore = async (
  username,
  password,
  store_name,
  location
) => {
  username = helpers.checkString(username, "username");
  password = helpers.checkString(password, "password");
  store_name = helpers.checkString(store_name, "store_name");
  location = helpers.checkString(location, "location");

  let hashed = await helpers.hashPassword(password);

  let client = await connect();
  let res_usernames = await client.query(`
    SELECT * FROM shipping.store WHERE username = $1;
  `, [username]);

  if (res_usernames.rows.length > 0)
    throw `Store already exists`;

  let res = await client.query(`
  INSERT INTO shipping.store
  (username, password, store_name, location)
  VALUES
  ($1, $2, $3, $4)
  RETURNING store_id;
  `, [username, hashed, store_name, location]);

  if (res.rows.length === 0)
    throw `Cannot create store`;
  return res.rows[0].store_id;
};

export const updateStore = async (store_id, updateObject) => {
  store_id = helpers.checkPositiveInteger(store_id, "store_id");

  let data = helpers.argObject({
    username: helpers.checkString,
    password: helpers.checkString,
    store_name: helpers.checkString,
    location: helpers.checkString
  }, {
    extraneous: true,
    discardExtra: true,
    numRequired: 1}
  )(updateObject, "updateObject");

  //Build based on supplied values
  let set = "SET ";
  let values = [];
  for (let key in data) {
    values.push(data[key]);
    set += `${key} = $${values.length},`;
  }
  set = set.substring(0, set.length - 1);
  values.push(store_id);

  let client = await connect();

  let query = `
  UPDATE shipping.store ${set} WHERE store_id = $${values.length};
  `;
  await client.query(query, values);
};

//Meant for internal use
export const getStoreById = async (store_id) => {
  store_id = helpers.checkPositiveInteger(store_id, "store_id");

  let client = await connect();
  let res = await client.query(`
  SELECT * FROM shipping.store WHERE store_id = $1;
  `, [store_id]);

  if (res.rows.length === 0)
    throw `Cannot get store`;
  return res.rows[0];
};

export const getStoreFromCredentials = async (username, password) => {
  username = helpers.checkString(username, "username");
  password = helpers.checkString(password, "password");

  let client = await connect();
  let res = await client.query(`
  SELECT * FROM shipping.store
  WHERE username = $1;
  `, [username]);

  if (res.rows.length === 0)
    throw `Cannot get store`;

  let store = res.rows[0];
  if (!(await compare(password, store.password)))
    throw `Cannot get store`;

  delete store.password;
  return store;
};