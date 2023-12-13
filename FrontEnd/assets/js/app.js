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
mainMenu();

/* ==========================
        GALLERY
============================*/
const gallery = document.querySelector(".gallery_container");
const navProjets = document.querySelector(".navProjets");

//Tableau des Projets
async function getWorks() {
  const resp = await fetch("http://localhost:5678/api/works");
  return await resp.json();
}
getWorks();

//Affichages des Projets
async function showWorks() {
  const arrayWorks = await getWorks();
  arrayWorks.forEach((works) => {
    creatworks(works);
  });
}
showWorks();

function creatworks(work) {
  const figure = document.createElement("figure");
  const img = document.createElement("img");
  img.src = work.imageUrl;
  const figCaption = document.createElement("figcaption");
  figCaption.textContent = work.title;
  figure.appendChild(img);
  figure.appendChild(figCaption);
  gallery.appendChild(figure);
  gallery.classList.add("gallery");
}

// Appel des catégories
async function getCategories() {
  const resp = await fetch("http://localhost:5678/api/categories");
  return await resp.json();
}

async function showButtons() {
  const categorys = await getCategories();
  // console.log(categorys);
  categorys.forEach((category) => {
    const btn = document.createElement("button");
    btn.textContent = category.name.toUpperCase();
    btn.id = category.id;
    btn.classList = "projets";
    navProjets.appendChild(btn);
  });
}
showButtons();

// Filtrage par catégories;
async function filterCategory() {
  const catalogue = await getWorks();
  // console.log(catalogue);
  const buttons = document.querySelectorAll(".navProjets button");
  // console.log(buttons);
  buttons.forEach((button) => {
    button.addEventListener("click", (e) => {
      // console.log(e);
      const btnId = e.target.id;
      gallery.innerHTML = "";
      if (btnId !== "0") {
        const catalogueFilter = catalogue.filter((projet) => {
          return projet.categoryId == btnId;
        });
        catalogueFilter.forEach((projet) => {
          creatworks(projet);
        });
      } else {
        showWorks();
      }

      console.log(btnId);
    });
  });
}

filterCategory();

/*========================
    Session ouverte
========================*/

const logged = window.sessionStorage.logged;
console.log(logged);
const admin = document.querySelector(".edition-barre .fa-regular");
console.log(admin);

const logout = document.querySelector("nav .logout");
const editionBarre = document.getElementsByClassName(".edition-barre");
const containerModals = document.querySelector(".containerModals");

const xmark = document.querySelector(".containerModals .fa-xmark");

if (logged == "true") {
  const sectionTitle = document.getElementById("mesprojets");

  // const admin = document.createElement("p");

  // admin.textContent = "admin";
  // console.log(admin);
  // sectionTitle.appendChild(p);

  logout.textContent = "logout";
  document.getElementById("bar").style.visibility = "visible";
  sectionTitle.style.marginBottom = "50px";
  navProjets.style.display = "none";
  logout.addEventListener("click", () => {
    window.sessionStorage.logged = false;
  });
}
/*========================
    Affichage de la modale
========================*/

admin.addEventListener("click", () => {
  containerModals.style.display = "flex";
});

xmark.addEventListener("click", () => {
  containerModals.style.display = "none";
});

containerModals.addEventListener("click", (e) => {
  // console.log(e.target.className);
  if (e.target.className == "containerModals") {
    containerModals.style.display = "none";
  }
});
