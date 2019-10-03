const content = document.querySelector("ion-content");

/**
 * Init
 */
fetch("https://devfest-nantes-2018-api.cleverapps.io/blog")
  .then(resp => resp.json())
  .then(articles => {
    for (const article of articles) {
      content.innerHTML += createCard(article);
    }
  });

/**
 * Cards creation
 */
function createCard(article) {
  return `
    <ion-card>
      <img src="https://devfest2018.gdgnantes.com${article.image}" />
      <ion-card-header>
        <ion-card-title>${article.title}</ion-card-title>
      </ion-card-header>
      <ion-card-content>${article.brief}</ion-card-content>
    </ion-card>`;
}
