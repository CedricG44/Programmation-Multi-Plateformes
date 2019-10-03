const content = document.querySelector("ion-content");

let picture = null;
let title = "";
let description = "";

/**
 * Init
 */
fetch("https://devfest-nantes-2018-api.cleverapps.io/blog")
  .then(resp => resp.json())
  .then(articles => {
    for (const article of articles) {
      content.innerHTML += createCard(article, false);
    }

    loadCustomArticles();
  });

customElements.define(
  "modal-content",
  class ModalContent extends HTMLElement {
    connectedCallback() {
      this.innerHTML = `
        <ion-header translucent>
          <ion-toolbar>
            <ion-title class="blog-title">Création d'un article privé</ion-title>
            <ion-buttons slot="end">
              <ion-button onClick="dismissModal()"><ion-icon name="close"></ion-icon></ion-button>
            </ion-buttons>
          </ion-toolbar>
        </ion-header>
        <ion-content fullscreen>
          <form onsubmit="saveArticle(event)">
            <ion-list lines="full" class="ion-no-margin ion-no-padding">
              <ion-item>
                <ion-label position="stacked">Titre <ion-text color="danger">*</ion-text></ion-label>
                <ion-input required type="text" oninput="handleTitle(event)"></ion-input>
              </ion-item>

              <ion-item>
                <ion-label position="stacked">Description</ion-label>
                <ion-input type="text" oninput="handleDescription(event)"></ion-input>
              </ion-item>
            </ion-list>

            <div class="ion-padding">
              <ion-button expand="block" type="submit" class="ion-no-margin">Enregistrer</ion-button>
            </div>
          </form>
        </ion-content>
      `;
    }
  }
);

/**
 * Cards creation
 */
function createCard(article, base64) {
  return `
    <ion-card>
      <img src="${
        base64 ? getImageBase64(article.image) : getImageUrl(article.image)
      }" />
      <ion-card-header>
        <ion-card-title>${article.title}</ion-card-title>
      </ion-card-header>
      <ion-card-content>${article.brief}</ion-card-content>
    </ion-card>`;
}

function getImageBase64(image) {
  return `data:image/png;base64, ${image}`;
}

function getImageUrl(image) {
  return `https://devfest2018.gdgnantes.com${image}`;
}

/**
 * Picture
 */
async function takePicture() {
  picture = await capacitorExports.Plugins.Camera.getPhoto({
    quality: 90,
    allowEditing: true,
    resultType: capacitorExports.Plugins.CameraResultType.Uri
  });

  openModal();
}

/**
 * Modal
 */
function openModal() {
  const modal = document.createElement("ion-modal");
  modal.component = "modal-content";

  document.body.appendChild(modal);
  return modal.present();
}

async function dismissModal() {
  const modal = document.querySelector("ion-modal");
  await modal.dismiss({
    dismissed: true
  });
}

function handleTitle(event) {
  title = event.target.value;
}

function handleDescription(event) {
  description = event.target.value;
}

async function saveArticle(event) {
  event.preventDefault();
  const date = new Date();
  const article = {
    id: "custom-article",
    title: title,
    posted: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDay()}`,
    primaryColor: "",
    secondaryColor: "",
    image: picture.base64String,
    brief: description
  };

  const customArticles = await getCustomArticles();
  customArticles.push(article);

  capacitorExports.Plugins.Storage.set({
    key: "custom-articles",
    value: JSON.stringify(customArticles)
  });

  content.innerHTML += createCard(article, true);
  dismissModal();
}

/**
 * Storage
 */
async function loadCustomArticles() {
  const customArticles = await getCustomArticles();
  for (const article of customArticles) {
    content.innerHTML += createCard(article, true);
  }
}

async function getCustomArticles() {
  const articles = await capacitorExports.Plugins.Storage.get({
    key: "custom-articles"
  });
  return articles.value !== null ? JSON.parse(articles.value) : [];
}
