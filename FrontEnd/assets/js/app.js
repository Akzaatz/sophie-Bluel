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

/* =========================
      création des bouttons
============================*/
async function showButtons() {
  const categorys = await getCategories();
  // console.log(categorys);
  categorys.forEach((category) => {
    const btn = document.createElement("button");
    btn.textContent = category.name.toUpperCase();
    btn.id = category.id;
    btn.classList = "projets";
    navProjets.appendChild(btn);

    return categorys;
  });
}
const categorys = showButtons();

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

      // console.log(btnId);
    });
  });
}

filterCategory();
/*========================
    Session ouverte
========================*/
const logged = window.sessionStorage.logged;
const logout = document.querySelector("nav .logout");
const edit = document.getElementById("edit");
const editionMode = document.querySelector("#portfolio .edition-mode");

// affichage de la croix de fermeture
const containerModals = document.querySelector(".container-modale");
const xmark = document.querySelector(".container-modale .fa-xmark");

if (logged == "true") {
  logout.textContent = "logout";
  const sectionTitle = document.getElementById("mesprojets");
  const barre = document.querySelector(".barre");
  barre.style.transform = "translateY(0px)";
  sectionTitle.style.marginBottom = "50px";
  navProjets.style.display = "none";
  editionMode.style.display = "flex";
  edit.style.visibility = "visible";
}

/*========================
    fermeture Session
========================*/

logout.addEventListener("click", () => {
  window.sessionStorage.logged = false;
  window.sessionStorage.token = "";
  window.sessionStorage.userId = "";
  logout.textContent = "login";
  navProjets.style.display = "flex";
  editionBarre.style.display = "none";
});

/*========================
    Affichage de la modale
========================*/

edit.addEventListener("click", () => {
  containerModals.style.display = "flex";
});

/*========================
    Fermeture de la modale
========================*/
xmark.addEventListener("click", () => {
  containerModals.style.display = "none";
});

containerModals.addEventListener("click", (e) => {
  console.log(e.target.className);
  if (e.target.className == "container-modale") {
    containerModals.style.display = "none";
  }
});
