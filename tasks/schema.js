/*
  This file is meant to initialize the database schema - creating a new schema
  alongside a set of tables. NOTE: Running this code will wipe the current
  schema.
*/

import {connect, disconnect} from "../database/connection.js";
let client = await connect();

try {
  await client.query("DROP SCHEMA shipping CASCADE;");
} catch (e) {} //Schema does not exist error; continue

await client.query("CREATE SCHEMA shipping;");

//TODO: Switch this to use hashes instead of the actual password
await client.query(
`CREATE TABLE shipping.user (
  user_id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  username VARCHAR(50) UNIQUE NOT NULL,
  password VARCHAR(128) NOT NULL,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  cc_info VARCHAR(200),
  shipping_address VARCHAR(200),
  admin boolean NOT NULL
);`);

//TODO: Switch this to use hashes instead of the actual password
await client.query(
`CREATE TABLE shipping.store (
  store_id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  username VARCHAR(50) UNIQUE NOT NULL,
  password VARCHAR(128) NOT NULL,
  store_name VARCHAR(100) NOT NULL,
  location VARCHAR(200) NOT NULL
);`);

await client.query(
`CREATE TYPE shipping.category AS ENUM (
  'Food',
  'Medical',
  'Hair Care',
  'Toiletries',
  'Dental',
  'Cleaning'
);`);

await client.query(
`CREATE TABLE shipping.product (
  product_id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  store_id integer REFERENCES shipping.store,
  product_name VARCHAR(100) NOT NULL,
  brand_name VARCHAR(100) NOT NULL,
  category shipping.category NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  availability integer
);`);

await disconnect();