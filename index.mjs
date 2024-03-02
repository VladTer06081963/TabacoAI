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
  try {
    const userData = req.body.content;
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo-0125",
        messages: [{ role: "user", content: userData }],
        max_tokens: 1000,
      }),
    });

    const data = await response.json(); // Попытка асинхронного получения данных

    // Проверка на наличие необходимых данных перед их использованием
    if (data.choices && data.choices.length > 0 && data.choices[0].message) {
      res.json(data.choices[0].message.content);
    } else {
      // Возвращаем ошибку или информационное сообщение, если ожидаемые данные отсутствуют
      res
        .status(500)
        .json({ error: "Не удалось получить ожидаемый ответ от API." });
    }
  } catch (error) {
    // Обработка ошибок, возникающих при запросе или обработке данных
    console.error("Произошла ошибка:", error);
    res
      .status(500)
      .json({ error: "Произошла ошибка при обработке вашего запроса." });
  }
});

const PORT = process.env.PORT || 3150;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}...`);
});
