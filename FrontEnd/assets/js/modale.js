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
// console.log(modalContent);

const imgIcone = document.createElement("i");
imgIcone.classList.add("fa-regular", "fa-image");
const deleteIcon = document.createElement("i");

insertButton.addEventListener("click", () => {
  thumbnailGrid.style.display = "none";
  if (modalTitle.textContent == "Ajout photo") {
    const tmp = document.getElementById("file").files[0];
    console.log(tmp);
    const tmp2 = document.getElementById("addTitle");
    console.log(tmp2);
  }

  // Modification du titre de la modale
  // ===================================
  modalTitle.textContent = "Ajout photo";
  // Modification du label et de la couleur du bouton de validation
  // ===================================
  insertButton.textContent = "Valider";
  insertButton.style.backgroundColor = "#A7A7A7";
  // création du formulaire
  // ===================================
  const form = document.createElement("form");
  form.id = "add-img";
  const imgChooser = document.createElement("div");
  imgChooser.classList.add("img-chooser");
  // console.log(imgChooser);

  // Ajout de la arrowLeft
  // ===================================
  const catalogueModal = document.querySelector(".catalogueModal");
  // console.log(catalogueModal);
  const arrowLeft = document.createElement("i");
  arrowLeft.classList.add("fa-solid", "fa-arrow-left");

  // Ajout de l'input
  // ===================================
  const inputImage = document.createElement("input");
  inputImage.type = "file";
  inputImage.name = "image";
  inputImage.id = "file";
  // inputImage.accept = "image/jpg, image/png";
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
  addInfos.classList.add("add-infos"); // Correction : retirer le point dans la classe
  console.log(addInfos);

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
});
