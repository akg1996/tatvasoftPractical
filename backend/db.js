const mongoose = require("mongoose");

mongoose
  .connect("mongodb+srv://<username>:<password>@cluster0.f9lnt.mongodb.net/<databaseName>?retryWrites=true&w=majority")
  .then(() => {
    const app = require("./app");
    console.log("database connection successful!");
    app.listen(5000, console.log("Server is running on port: " + 5000));
  })
  .catch((err) => {
    console.log("mongodb connection error", err);
    process.exit(1);
  });
