/* Methods for accessing + modifying the "user" table in our database. */

import {compare} from "bcrypt";
import * as helpers from "../helpers.js";
import {connect} from "../database/connection.js";

export const createUser = async (
  username,
  password,
  first_name,
  last_name,
  cc_info,
  shipping_address
) => {
  username = helpers.checkString(username, "username");
  password = helpers.checkString(password, "password");
  first_name = helpers.checkString(first_name, "first_name");
  last_name = helpers.checkString(last_name, "last_name");

  if (cc_info !== null)
    cc_info = helpers.checkString(cc_info, "cc_info");

  if (shipping_address !== null)
    shipping_address = helpers.checkString(shipping_address, "shipping_address");

  //Safety purposes
  let hashed = await helpers.hashPassword(password);

  let client = await connect();
  let res_usernames = await client.query(`
    SELECT * FROM shipping.user WHERE username = $1;
  `, [username]);

  if (res_usernames.rows.length > 0)
    throw `User already exists`;

  let res = await client.query(`
  INSERT INTO shipping.user
  (username, password, first_name, last_name, cc_info, shipping_address, admin)
  VALUES
  ($1, $2, $3, $4, $5, $6, false)
  RETURNING user_id;
  `, [username, hashed, first_name, last_name, cc_info, shipping_address]);

  if (res.rows.length === 0)
    throw `Cannot create user`;
  return res.rows[0].user_id;
};

//Meant for internal use
export const getUserById = async (user_id) => {
  user_id = helpers.checkPositiveInteger(user_id, "user_id");

  let client = await connect();
  let res = await client.query(`
  SELECT * FROM shipping.user WHERE user_id = $1;
  `, [user_id]);

  if (res.rows.length === 0)
    throw `Cannot get user`;
  return res.rows[0];
};

//Log in
export const getUserFromCredentials = async (username, password) => {
  username = helpers.checkString(username, "username");
  password = helpers.checkString(password, "password");

  let client = await connect();
  let res = await client.query(`
  SELECT * FROM shipping.user WHERE username = $1;
  `, [username]);

  if (res.rows.length === 0)
    throw `Cannot get user`;

  let user = res.rows[0];
  if (!(await compare(password, user.password)))
    throw `Cannot get user`;

  delete user.password;
  return user;
};

//We will probably make it so you'll have to manually make users admins through
//this database call
//NOTE: This call fails silently
export const setAdmin = async (username) => {
  username = helpers.checkString(username, "username");

  let client = await connect();
  await client.query(`
  UPDATE shipping.user
  SET admin = true
  WHERE username = $1
  `, [username]);
};