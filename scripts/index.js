// reference a la listes des guidez
const guidesListElement = document.querySelector('.guides');

// setup guidez; afficher les guides dans la liste des guides (guidez) 
 
const setupGuides = (données) => {
    let html = "";
    données.forEach((doc) => {
        const guideData = doc.data();
        html += `<li>
            <div class="collapsible-header grey lighten-4">${guideData.title}</div>
            <div class="collapsible-body white">${guideData.content}</div>
        </li>`;
    });
    guidesListElement.innerHTML = html;
};
  

 






// Initialisation des composants Materialize au chargement de la page
document.addEventListener('DOMContentLoaded', function () {
    var modals = document.querySelectorAll('.modal');
    M.Modal.init(modals); // M : Materialize library et Modal une instance de la classe Modal de Materialize qui permet de gérer les modals et les afficher

    var items = document.querySelectorAll('.collapsible');
    M.Collapsible.init(items); // M : Materialize library et Collapsible une instance de la classe Collapsible de Materialize qui permet de gérer les class collapsible et les afficher
 })