import express from "express";
import fetch from "node-fetch"; // используем import вместо require
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index");
});
app.get("/about", (req, res) => {
  res.render("about");
});
app.get("/user/:username", (req, res) => {
  let data = {
    username: req.params.username,
    hobbies: [
      "Хотите такой сайт?",
      "Регистрируйтесь у нас",
      "и генерируйте",
      "свои сайты!!!",
    ],
  };
  res.render("user", data);
});

app.post("/api/message", express.json(), async (req, res) => {
  const userData = req.body.content;
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-4-0125-preview",
      messages: [{ role: "user", content: userData }],
      max_tokens: 1000,
    }),
  });
  const data = await response.json();
  res.json(data.choices[0].message.content);

  // const responseAI = data.choices[0].message.content;
  // document.getElementById()
  // console.log(responseAI)
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
