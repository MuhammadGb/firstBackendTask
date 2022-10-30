const express = require("express");
const cors = require("cors");
const { handleError } = require("./utils/error");

const app = express();

app.use(cors());

//app.use(express.json());
//app.use(express.urlencoded({ extended: true }));

app.get("/", async (req, res, next) => {
  try {
    res.json({
      slackUsername: "MuhammadGb",
      age: 1,
      backend: true,
      bio: "Nothing really spectacular about me except that I am a Muslim",
    });
  } catch (error) {
    next(error);
  }
});

app.use(handleError);

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Server is up on port ${port}.`);
});

// (req, res) => {
//   res.send(`Welcome to Express Recipes, ${req.params.name}!`);
// };
