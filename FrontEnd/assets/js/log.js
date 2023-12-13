// import { mainMenu } from "./menu";
// mainMenu();

// ====================
// Navigation menu
// ====================
const menuLog = document.getElementById("menuLog");
const menuProj = document.getElementById("menuProj");
const loginForm = document.getElementById("loginForm");

menuLog.addEventListener("click", (e) => {
  window.location.href = "./pages/login.html";
});
menuProj.addEventListener("click", () => {
  window.location.href = "../index.html";
});

/* ===================
     Séquence login
=====================*/

document.addEventListener("DOMContentLoaded", () => {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    console.log(email, password);

    try {
      const response = await fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      if (!response.ok) {
        const errorLogin = document.querySelector(".form-popup p");
        errorLogin.textContent = "Identifiants incorrects. Veuillez réessayer.";

        // throw new Error("Vous devez être Admin pour acceder à cette fonction");
      }

      const data = await response.json();
      console.log(data);

      if (!data) {
        throw new Error("Réponse vide");
      }
      window.sessionStorage.setItem("logged", true);
      window.sessionStorage.setItem("token", data.token);
      window.sessionStorage.setItem("userId", data.userId);
      window.location.href = "../index.html";
    } catch (error) {
      console.error("Erreur de connexion:", error);
    }
  });
});
