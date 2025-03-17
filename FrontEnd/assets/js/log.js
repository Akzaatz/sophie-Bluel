/* ==========================
  Barre de Navigation
  ============================*/

function mainMenu() {
  const menuLog = document.getElementById("menuLog");

  const menuProj = document.getElementById("menuProj");
  menuLog.addEventListener("click", (e) => {
    e.preventDefault;
    window.location.href = "/FrontEnd/pages/login.html";
  });
  menuProj.addEventListener("click", () => {
    window.location.href = "https://sophie-bluel.akzaatz.com";
  });
}
mainMenu();
z;

/* ===================
     Séquence login
=====================*/
const email = document.getElementById("email");
const password = document.getElementById("password");

document.addEventListener("DOMContentLoaded", () => {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const userEmail = email.value;
    const userPassword = password.value;

    try {
      const response = await fetch(
        "https://sophie-bluel.akzaatz.com/api/users/login",
        {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: userEmail,
            password: userPassword,
          }),
        }
      );

      if (!response.ok) {
        email.style.border = "2px solid #FF0000";
        password.style.border = "2px solid #FF0000";
        const errorLogin = document.querySelector(".form-popup p");
        errorLogin.textContent = "Identifiants incorrects. Veuillez réessayer.";

        throw new Error("Vous devez être Admin pour acceder à cette fonction");
      }

      const data = await response.json();
      console.log(data);

      if (!data) {
        throw new Error("Réponse vide");
      }
      window.sessionStorage.setItem("logged", true);
      window.sessionStorage.setItem("token", data.token);
      window.sessionStorage.setItem("userId", data.userId);
      window.location.href = "sophie-bluel.akzaatz.com.";
    } catch (error) {
      console.error("Erreur de connexion:", error);
    }
  });
});
