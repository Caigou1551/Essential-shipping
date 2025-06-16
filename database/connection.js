/* Functions for connecting/disconnecting from the database. */

import pg from "pg";
import config from "./config.js";

let _client = null;

export let connect = async () => {
  if (!_client) {
    _client = new pg.Client(config);
    await _client.connect();
  }
  return _client;
};

export let disconnect = async () => {
  if (_client) {
    await _client.end();
    _client = null;
  }
};