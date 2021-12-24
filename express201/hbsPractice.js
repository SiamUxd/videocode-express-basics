const path = require("path");

const express = require("express");
const app = express();

const helmet = require("helmet");
app.use(helmet());

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set("view engine", "hbs");
//app.set("view engine", "hbs");
//app.set("view engine", "pug");
app.set("views", [path.join(__dirname, "views")]);
/* app.get("/test", (req, res, next) => {
 // data = req.body;
  res.status(200).json({
    msg: "sanity check",
  });
}); */
function validateUser(req, res, next) {
  res.locals.validated = true;
  next();
}
app.use(validateUser);
app.get("/", (req, res, next) => {
  // data = req.body;

  res.render("index", {
    countries: [
      { name: "USA", capital: "Washington DC" },
      { name: "Canada", capital: "Ottawa" },
    ],
    title: "My First Express App",
    message: "Hello World",
    html: `<p><img src="data:image/jpeg;base64,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"
     alt="Girl in a jacket"></img></p>`,
  });
});

app.listen(3000);
