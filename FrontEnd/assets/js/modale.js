document.addEventListener("DOMContentLoaded", function () {
  let inputTitle;
  const thumbnailGrid = document.querySelector(".thumbnail-grid");
  const token = window.sessionStorage.getItem("token");

  // ==============================
  // Affichage des miniatures
  // ==============================

  // Récupération de la liste des miniatures depuis le serveur
  async function showThumbnails() {
    try {
      const response = await fetch("http://localhost:5678/api/works");
      const miniatures = await response.json();
      miniatures.forEach((miniature) => {
        const img = document.createElement("img");
        img.src = miniature.imageUrl;
        img.style.height = "102px";

        const figure = document.createElement("figure");

        // ==============================
        //Ajout corbeille
        // ==============================

        const deleteIcon = document.createElement("i");
        deleteIcon.classList.add("fa-solid", "fa-trash-can");

        deleteIcon.id = miniature.id;

        thumbnailGrid.appendChild(figure);

        figure.appendChild(img);
        figure.appendChild(deleteIcon);

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

  // Appel des élements HTML
  // ==============================
  const insertButton = document.getElementById("insert-button");
  const submitButton = document.getElementById("submit-button");
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

    // Modification du titre de la modale
    modalTitle.textContent = "Ajout photo";
    // Modification du label et de la couleur du bouton de validation
    insertButton.style.display = "none";
    submitButton.style.display = "block";
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

    // Ajout du champ Texte
    // ===================================

    const addInfos = document.createElement("div");
    addInfos.classList.add("add-infos");

    const labelTitle = document.createElement("label");
    labelTitle.id = "label-title";
    labelTitle.textContent = "Titre";
    labelTitle.htmlFor = "addTitle";

    const inputTitle = document.createElement("input");

    inputTitle.type = "text";
    inputTitle.name = "title";
    inputTitle.id = "addTitle";
    inputTitle.setAttribute("required", "true");

    // Ajout des options statiques au champ Select
    // ============================================

    const selectCategory = document.createElement("select");
    selectCategory.name = "category";
    selectCategory.id = "addCategory";

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

    // Ajout du champ Catégories
    // ===================================
    const labelCategory = document.createElement("label");
    labelCategory.id = "label-category";
    labelCategory.textContent = "Catégories";
    labelCategory.htmlFor = "addCategory";

    // Récupération des catégories :
    async function categoryOptions() {
      const categories = await getCategories();

      // Ajout des options statiques
      selectCategory.appendChild(optionObjet.cloneNode(true));
      selectCategory.appendChild(optionAppartements.cloneNode(true));
      selectCategory.appendChild(optionImmeubles.cloneNode(true));

      // Suppression des options existantes
      selectCategory.innerHTML = "";
      // Ajout des options dynamiques
      categories.forEach((category) => {
        const option = document.createElement("option");
        option.value = category.id.toString();
        option.textContent = category.name;
        selectCategory.appendChild(option);
      });
    }

    categoryOptions();

    // Positionnement des éléments
    // ===================================

    catalogueModal.appendChild(arrowLeft);
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
    insertImage.appendChild(form);

    // // ==============================
    // // Preview de l'image sélectionnée
    // // ==============================

    function prevImg() {
      const inputFile = document.getElementById("file");
      if (!inputFile) {
        console.error("L'élément avec l'ID 'file' n'a pas été trouvé.");
        return;
      }

      inputFile.addEventListener("change", () => {
        // Récupération du 1er fichier de la liste
        const file = inputFile.files[0];

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
      formContainer.innerHTML = "";
      imgChooser.style.display = "none";
      insertButton.style.display = "flex";
      submitButton.style.display = "none";
      previewImage.style.display = "none";
      arrowLeft.style.display = "none";
      modalTitle.textContent = "Galerie Photo";
      document.getElementById("msg_err").innerHTML = "";
    });

    formContainer.style.display = "flex";
    prevImg();
  });

  // ==============================
  // Ajout nouveau projet
  // ==============================

  submitButton.addEventListener("click", async (e) => {
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
      if (title.trim() === "" || !file || category === "") {
        document.getElementById("msg_err").innerHTML =
          "Tous les champs requis doivent être remplis";

        throw new Error("Tous les champs requis doivent être remplis");
      }
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
        document.getElementById("msg_err").innerHTML =
          "Erreur lors de l'envoi du fichier";
        throw new Error("Erreur lors de l'envoi du fichier");
      }

      // Ajout du nouveau projet à la galerie
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
});
