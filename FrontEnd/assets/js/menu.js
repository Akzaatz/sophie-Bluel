//Navigation menu

function mainMenu() {
  const menuLog = document.getElementById("menuLog");

  const menuProj = document.getElementById("menuProj");
  menuLog.addEventListener("click", () => {
    window.location.href = "./pages/login.html";
  });
  menuProj.addEventListener("click", () => {
    window.location.href = "../index.html";
  });
}

export { mainMenu };
