# Essential-Shipping-Service

This application provides a service for users to browse, view, and purchase essential items from an online marketplace.

## Setup Instructions

1. Install PostgreSQL

Download and install PostgreSQL (https://www.postgresql.org/download).
Configure the server according to `database/config.js`.

(user: `postgres`, password: `postgres`, port: `5432`)

2. Install Node.js dependencies

Ensure that the latest version of `node` and `npm` are installed (https://nodejs.org/en/download).
In the project root directory, run `npm install`.

3. Create Database and Tables

After both node and Postgres are installed, run `npm run schema` in the project root directory.
This will manually construct the DB schema.
If you want to work with pre-generated data for testing, run `npm run seed`.

4. Run the server

Run `npm start`, and navigate to `http://localhost:3000/`.

You should see the homepage and be able to register users or stores!