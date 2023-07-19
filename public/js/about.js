function toggleDropdown() {
    var dropdownContent = document.getElementById("dropdown-content");
    var dropdownTitle = document.getElementById("dropdown-title");
    if (dropdownContent.style.display === "none") {
      dropdownContent.style.display = "block";
      dropdownTitle.innerText = "Нажмите, чтобы скрыть";
    } else {
      dropdownContent.style.display = "none";
      dropdownTitle.innerText = "Нажмите, чтобы раскрыть";
    }
  }
  
  window.onload = function() {
    var infoBox = document.getElementById("info-box");
    infoBox.innerHTML = "<h3>Информация для отображения</h3><p>Здесь много интересной информации, которую можно отобразить на вашем веб-сайте.</p>";
  }