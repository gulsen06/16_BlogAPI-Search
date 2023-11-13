/*      BLOGAPI PROPJECT index file     */

"use strict";
const cookieSession = require("cookie-session");
const express = require("express");
const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 8001;

//? DB conneciton
require("./src/dbConnection");

app.use(express.json());

//? SEARCH / SORT / PAGINATION
app.use(require("./src/middlewares/searchSortPagination"));

//session and cookies
//npm i cookie-session
const session = require("cookie-session");
app.use(session({ secret: process.env.SECRETKEY || "write key for session" }));

app.use("/blog", require("./src/routes/blogRoutes"));
app.use("/user", require("./src/routes/userRoutes"));
// sync data
//require("./src/helpers/sync")();

//?errorHandler
app.use(require("./src/errorHandler"));

app.listen(PORT, () =>
  console.log("server is runnin on http://127.0.0.1:" + PORT)
);
