/*
  Entry into the Node application. This is where constants and routes should be
  initialized.
*/

import express from "express";
const app = express();
import exphbs from "express-handlebars";
import session from "express-session";
import configRoutes from "./routes/index.js";

const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

//For logging in + signing up
app.use(session({
  name: "essentials.com",
  secret: "89hfuijnEISufvhwaituwp3",
  saveUninitialized: false,
  resave: false,
  cookie: {
    maxAge: 3600000 //One hour
  }
}));

app.engine("handlebars", exphbs.engine({defaultLayout: "main"}));
app.set("view engine", "handlebars");

configRoutes(app);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}/`);
});