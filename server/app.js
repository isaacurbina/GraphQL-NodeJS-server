//#region constants
const express = require("express");
const app = express();
const graphqlHTTP = require("express-graphql");
const schema = require("./schema/schema");
const testSchema = require("./schema/types_schema");
const mongoose = require("mongoose");
const mongooseUrl =
  "mongodb+srv://iurbinacantu:KjLWhDoSlK1WPlJK@gq-course.7ool4.mongodb.net/";
//#endregion

//#region setup
// Mongoose
mongoose.connect(mongooseUrl);
mongoose.connection.once("open", () => {
  console.log("Yes! We are connected!");
});

// GraphQL
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  })
);

// App
app.listen(4000, () => {
  // localhost:4000
  console.log("Listening for requests on my awesome port 4000");
});
//#endregion
