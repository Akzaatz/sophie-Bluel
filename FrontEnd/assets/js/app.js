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
// ==========================
//  Tri Gallerie Projets
// ==========================
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

async function getCategories() {
  const resp = await fetch("http://localhost:5678/api/categories");
  return await resp.json();
}

async function showButtons() {
  const categorys = await getCategories();
  categorys.forEach((category) => {
    const btn = document.createElement("button");
    btn.textContent = category.name.toUpperCase();
    btn.id = category.id;
    btn.classList = "projets";
    navProjets.appendChild(btn);
  });
}
showButtons();

// filterCategory();

async function filterCategory() {
  const catalogue = await getWorks();

  const buttons = document.querySelectorAll(".navProjets button");

  buttons.forEach((button) => {
    button.addEventListener("click", (e) => {
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
