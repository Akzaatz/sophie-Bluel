const thumbnailGrid = document.querySelector(".thumbnail-grid");
const token = window.sessionStorage.getItem("token");
// console.log(token);
// console.log(thumbnailGrid);
// ==============================
// Affichage des miniatures
// ==============================
async function showThumbnails() {
  try {
    const response = await fetch("http://localhost:5678/api/works");
    const miniatures = await response.json();
    // console.log(miniatures);

    miniatures.forEach((miniature) => {
      const img = document.createElement("img");
      img.src = miniature.imageUrl;
      img.style.height = "102px";

      const figure = document.createElement("figure");
      // console.log(figure);

      // ==============================
      //Ajout corbeille
      // ==============================
      const deleteIcon = document.createElement("i");
      deleteIcon.classList.add("fa-solid", "fa-trash-can");
      // console.log(deleteIcon);

      deleteIcon.id = miniature.id;

      thumbnailGrid.appendChild(figure);

      figure.appendChild(img);
      figure.appendChild(deleteIcon);

      // console.log(miniature.id);

      // ==============================
      // Suppression projets
      // ==============================
      deleteIcon.addEventListener("click", () =>
        handleDeleteMiniature(miniature.id)
      );
      function handleDeleteMiniature(miniatureId) {
        fetch(`http://localhost:5678/api/works/${miniature.id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        })
          .then((response) => response.json())
          .then((data) => {
            thumbnailGrid.innerHTML = "";
            showThumbnails();
          })
          .catch((error) =>
            console.error("Erreur lors de la suppression :", error)
          );
      }
    });
  } catch (error) {
    console.error("Erreur lors du chargement des images :", error);
  }
}
showThumbnails();
// ==============================
// Ajout photos
// ==============================

const insertButton = document.getElementById("insert-button");
const insertImage = document.querySelector(".insert-image");
const modalTitle = document.getElementById("modal-title");
const modalContent = document.querySelector(".modal-content");
const catalogueModal = document.querySelector(".catalogueModal");
const previewImage = document.createElement("img");
previewImage.id = "prev-img";
previewImage.src = "#";
previewImage.alt = "prévisulaisation de l'image sélectionnée ";
previewImage.style.display = "none";

// Déclaration du formulaire
const form = document.createElement("form");
// form.id = "add-img";

insertButton.addEventListener("click", () => {
  thumbnailGrid.style.display = "none";
  if (modalTitle.textContent == "Ajout photo") {
    const tmp = document.getElementById("file").files[0];
    console.log(tmp);
    const tmp2 = document.getElementById("addTitle");
    console.log(tmp2);
  }

  // Modification du titre de la modale
  modalTitle.textContent = "Ajout photo";
  // Modification du label et de la couleur du bouton de validation
  insertButton.textContent = "Valider";
  insertButton.style.backgroundColor = "#A7A7A7";
  // création du formulaire
  const imgChooser = document.createElement("div");
  imgChooser.classList.add("img-chooser");

  // Ajout de la flèche retour
  const arrowLeft = document.createElement("i");
  arrowLeft.classList.add("fa-solid", "fa-arrow-left");
  // console.log(arrowLeft);

  // Ajout de l'icône image
  const imgIcone = document.createElement("i");
  imgIcone.classList.add("fa-regular", "fa-image");

  // Ajout de l'input
  const inputImage = document.createElement("input");
  inputImage.type = "file";
  inputImage.name = "image";
  inputImage.id = "file";
  const labelImage = document.createElement("label");
  labelImage.textContent = "+ Ajouter photo";
  labelImage.htmlFor = "file";
  labelImage.classList.add("add-img");
  const instructions = document.createElement("p");
  instructions.textContent = ".jpg, png : 4mo max";

  //

  // Ajout du champ Texte
  // ===================================

  const addInfos = document.createElement("div");
  addInfos.classList.add("add-infos");
  // console.log(addInfos);

  const labelTitle = document.createElement("label");
  labelTitle.id = "label-title";
  labelTitle.textContent = "Titre";
  labelTitle.htmlFor = "addTitle";
  console.log(labelTitle);

  const inputTitle = document.createElement("input");
  inputTitle.type = "text";
  inputTitle.name = "title";
  inputTitle.id = "addTitle";

  // Ajout du champ Catégories
  // ===================================

  const labelCategory = document.createElement("label");
  labelCategory.id = "label-category";
  labelCategory.textContent = "Catégories";
  labelCategory.htmlFor = "addCategory";

  const selectCategory = document.createElement("select");
  selectCategory.name = "category";
  selectCategory.id = "addCategory";

  // Ajout des options au champ Select
  // ======================================
  const optionObjet = document.createElement("option");
  optionObjet.value = "objet";
  optionObjet.textContent = "Objets";

  const optionAppartements = document.createElement("option");
  optionAppartements.value = "appartements";
  optionAppartements.textContent = "Appartements";

  const optionImmeubles = document.createElement("option");
  optionImmeubles.value = "immeubles";
  optionImmeubles.textContent = "Hôtels et restaurants";

  selectCategory.appendChild(optionObjet);
  selectCategory.appendChild(optionAppartements);
  selectCategory.appendChild(optionImmeubles);

  // Positionnement des éléments
  // ===================================
  catalogueModal.appendChild(arrowLeft);
  insertImage.appendChild(form);
  form.appendChild(imgChooser);
  imgChooser.appendChild(imgIcone);
  imgChooser.appendChild(labelImage);
  imgChooser.appendChild(inputImage);
  imgChooser.appendChild(instructions);
  modalContent.appendChild(addInfos);
  modalContent.appendChild(labelTitle);
  modalContent.appendChild(inputTitle);
  modalContent.appendChild(labelTitle);
  modalContent.appendChild(labelCategory);
  modalContent.appendChild(inputTitle);
  modalContent.appendChild(addInfos);
  modalContent.appendChild(selectCategory);
  imgChooser.appendChild(previewImage);

  prevImg();
});

// ==============================
// retour au catalogue
// ==============================

// arrowLeft.addEventListener("click", () => {
//   thumbnailGrid.style.display = "flex";
//   form.style.display = "none";
// });

// ==============================
// Ajout nouveau projet
// ==============================

document.getElementById("insert-button").addEventListener("submit", (e) => {
  e.preventDefault();
  const formdata = new FormData(e.target);

  fetch("http://localhost:5678/api/works", {
    method: "POST",
    body: formdata,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Erreur lors de l'envoi du fichier");
      }
      return response.json();
    })
    .then((data) => {
      showThumbnails();
      showWorks();
      form.reset();
      catalogueModal.style.display = "flex";
      thumbnailGrid.style.display = "none";
      imgChooser.style.display = "none";
      previewImage.style.display = "block";
    })
    .catch((error) => {
      console.error("Erreur :", error);
    });
});

// ==============================
// Sélection de la catégorie
// ==============================
async function selectCategory() {
  const select = document.getElementById("addCategory");
  const categorys = await getCategories();
  categorys.forEach((category) => {
    const option = document.createElement("option");
    option.value = category.id;
    option.textContent = category.name;
  });
}

selectCategory();

// ==============================
// Preview de l'image sélectionnée
// ==============================

function prevImg() {
  const inputFile = document.getElementById("file");
  if (!inputFile) {
    console.error("L'élément avec l'ID 'file' n'a pas été trouvé.");
    return;
  }

  inputFile.addEventListener("change", () => {
    const file = inputFile.files[0];
    // console.log(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        previewImage.src = e.target.result;
        previewImage.style.display = "block";
      };
      reader.readAsDataURL(file);
    } else {
      previewImage.style.display = "none";
    }
  });
}

// prevImg();
