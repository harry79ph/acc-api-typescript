import express, { Request, Response } from "express";
import cors from 'cors';
import { check, validationResult } from 'express-validator';
const User = require("./model/User");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/users", (req: Request, res: Response) => {
  res.json({msg: "alive"});
});

app.post(
  "/users",
  [
    check("firstname", "First Name should be at least 2 characters").isLength({ min: 2 }),
    check("email", "Email is not valid").isEmail(),
    check("phone", "Phone number should be at least 10 digits long").isLength({ min: 10 }),
    check("finalcomments", "Min comment length should be 5 characters").isLength({ min: 5 })
  ],
  async (req: Request, res: Response) => {
    const { email } = req.body;
    console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }
    const users = await User.findAll();
    let user = users.find((user: { email: string; }) => {
      return user.email === email;
    });
    if (user) {
        return res.status(400).json({
        errors: [{ msg: "This email already exists" }],
      });
    }
    await User.create(req.body);
    res.json({msg: "Your details submitted"});
  }
);

app.delete("/users/:email", async (req: Request, res: Response) => {
  const reqEmail = req.params.email;
  await User.destroy({
    where: { email: reqEmail }
  });
  res.json({msg: "user removed"});
});

app.get("/users/dlt-alll", async (req: Request, res: Response) => {
  await User.destroy({
    where: {},
    truncate: true
  });
  res.json({msg: "all removed"});
});

app.listen(5000, () => {
  console.log("App running on port 5000");
});
