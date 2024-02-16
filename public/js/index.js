function submitForm(e) {
  e.preventDefault();
  getData();
}

async function getData() {
  let userData = document.getElementById("input").value.trim();
  if (userData === "") return false;

  // Вставляем сообщение о принятом запросе и показываем лоадер
  document.getElementById("messages").innerHTML =
    `<div class="mess-user">
      <h3>Ваш запрос принят...</h3> 
      <div class="loader"></div> <!-- Добавляем лоадер -->
      <p>${userData}</p>
    </div>` + document.getElementById("messages").innerHTML;

  document.getElementById("input").value = "";
  // Находим и показываем лоадер
  const loader = document.querySelector(".mess-user .loader");
  loader.style.display = "block"; // Показываем лоадер

  try {
    const response = await fetch("/api/message", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content: userData }),
    });
    const data = await response.json();

    // После получения ответа скрываем лоадер
    loader.style.display = "none"; // Скрываем лоадер

    // Обновляем содержимое сообщений, заменяя лоадер на полученные данные
    document.getElementById("messages").innerHTML =
      `<div class="mess-chat">
        <p>${data}</p>
      </div>` + document.getElementById("messages").innerHTML;
  } catch (error) {
    console.error("Error:", error);
    // В случае ошибки также скрываем лоадер
    loader.style.display = "none"; // Скрываем лоадер
  }
}
