const express = require("express");
const cors = require("cors");
const { handleError } = require("./utils/error");

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req, res, next) => {
  try {
    res.json({
      slackUsername: "MuhammadGB",
      age: 1,
      backend: true,
      bio: "Nothing really spectacular about me except that I am a Muslim",
    });
  } catch (error) {
    next(error);
  }
});
app.post("/", async (req, res, next) => {
  try {
    let result;
    const { operation_type, x, y } = req.body;
    if (!operation_type || !x || !y) {
      const err = new Error("missing parameters");
      err.statusCode = 404;
      throw err;
    }
    const addition = operation_type.match(/(addition|add|plus)/gi);
    const subtraction = operation_type.match(/(subtraction|subtract|minus)/gi);
    const multiplication = operation_type.match(
      /(multiplication|multiply|times)/gi,
    );
    if (addition) {
      result = Math.abs(Number(x) + Number(y));
    } else if (subtraction) {
      result = Math.abs(Number(x) - Number(y));
    } else if (multiplication) {
      result = Number(x) * Number(y);
    }
    res.status(200).json({
      slackUsername: "MuhammadGB",
      result,
      operation_type,
      x,
      y,
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
