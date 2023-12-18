//Navigation menu

function mainMenu() {
  const menuLog = document.getElementById("menuLog");

  const menuProj = document.getElementById("menuProj");
  menuLog.addEventListener("click", (e) => {
    e.preventDefault;
    window.location.href = "/FrontEnd/pages/login.html";
  });
  menuProj.addEventListener("click", () => {
    window.location.href = "/FrontEnd/index.html";
  });
}
mainMenu();
