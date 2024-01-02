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
const formContainer = document.querySelector(".form-container");
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
  // console.log(labelTitle);

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

  async function populateCategoryOptions() {
    const categories = await getCategories();

    categories.forEach((category) => {
      const option = document.createElement("option");
      option.value = category.id.toString();
      option.textContent = category.name;
      selectCategory.appendChild(option);
    });
  }

  populateCategoryOptions();

  // Ajout des options au champ Select
  // boucler sur catégorys (ligne 57)
  // ======================================
  const optionObjet = document.createElement("option");
  optionObjet.value = "";
  optionObjet.textContent = "Objets";

  const optionAppartements = document.createElement("option");
  optionAppartements.value = "";
  optionAppartements.textContent = "Appartements";

  const optionImmeubles = document.createElement("option");
  optionImmeubles.value = "";
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
  formContainer.appendChild(labelTitle);
  formContainer.appendChild(labelCategory);
  formContainer.appendChild(inputTitle);
  formContainer.appendChild(addInfos);
  formContainer.appendChild(selectCategory);
  imgChooser.appendChild(previewImage);

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
      console.log(file);
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

  prevImg();

  // ==============================
  // retour au catalogue
  // ==============================

  arrowLeft.addEventListener("click", () => {
    thumbnailGrid.style.display = "grid";
    formContainer.style.display = "none";
    imgChooser.style.display = "none";
    insertButton.textContent = "Ajouter une photo";
    insertButton.style.backgroundColor = "#1d6154";
    previewImage.style.display = "none";
    arrowLeft.style.display = "none";
  });
});

// ==============================
// Ajout nouveau projet
// ==============================
document
  .getElementById("insert-button")
  .addEventListener("click", async (e) => {
    e.preventDefault();

    // Récupération des valeurs du formulaire
    const title = document.getElementById("addTitle").value;
    const category = document.getElementById("addCategory").value;
    const fileInput = document.getElementById("file");
    const file = fileInput.files[0];

    // Construction de l'objet de données
    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("image", file);

    try {
      // Envoie des données au serveur
      // ==============================
      const response = await fetch("http://localhost:5678/api/works", {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
          // définir le content type  (header content type formData)
        },
      });

      if (!response.ok) {
        throw new Error("Erreur lors de l'envoi du fichier");
      }

      // Ajouter du nouveau projet à la galerie
      // ==============================
      const newProject = await response.json();
      addProjectToGallery(newProject);

      //réinitialisation du formulaire
      // ==============================
      form.reset();
      catalogueModal.style.display = "flex";
      thumbnailGrid.style.display = "none";
      imgChooser.style.display = "none";
      previewImage.style.display = "block";
    } catch (error) {
      console.error("Erreur :", error);
    }
  });
//Affichage nopuveau projet dans la galerie
// ==============================
function addProjectToGallery(project) {
  creatworks(project);

  const img = document.createElement("img");
  img.src = project.imageUrl;
  img.style.height = "102px";

  const figure = document.createElement("figure");
  const deleteIcon = document.createElement("i");
  deleteIcon.classList.add("fa-solid", "fa-trash-can");
  deleteIcon.id = project.id;

  thumbnailGrid.appendChild(figure);
  figure.appendChild(img);
  figure.appendChild(deleteIcon);

  deleteIcon.addEventListener("click", () => handleDeleteMiniature(project.id));
}

addProjectToGallery();
