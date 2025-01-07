
// reference aux links logged-in/out
// Get references to logged-in/out links
const loginLinks = document.querySelectorAll('.logged-in');
const logoutLinks = document.querySelectorAll('.logged-out');

// Setup UI elements based on authentication state
const setupUI = (user) => {
    // Toggle visibility of links based on auth state
    const showLinks = user ? loginLinks : logoutLinks;
    const hideLinks = user ? logoutLinks : loginLinks;
    
    showLinks.forEach(link => link.style.display = 'block');
    hideLinks.forEach(link => link.style.display = 'none');
}

// reference a la listes des guidez
const guidesListElement = document.querySelector('.guides');

// setup guidez; afficher les guides dans la liste des guides (guidez) 
const setupGuides = (données) => {
    // si on a des données dans la collection guides
    if (données.length > 0) {
        let html = "";
        données.forEach((doc) => {
            const guideData = doc.data();
            const li = `<li>
            <div class="collapsible-header grey lighten-4">${guideData.title}</div>
            <div class="collapsible-body white">${guideData.content}</div>
            
                    </li>`;
            html += li;
        });
        guidesListElement.innerHTML = html;
    }
    // sinon afficher un message pour pousser l'utilisateur à se connecter
    else {
        guidesListElement.innerHTML = '<h5 class="center-align">Login to view guides if you have an account ,\n\n  if not, you are free to create one</h5>';
    }

}
 






// Initialisation des composants Materialize au chargement de la page
document.addEventListener('DOMContentLoaded', function () {
    var modals = document.querySelectorAll('.modal');
    M.Modal.init(modals); // M : Materialize library et Modal une instance de la classe Modal de Materialize qui permet de gérer les modals et les afficher

    var items = document.querySelectorAll('.collapsible');
    M.Collapsible.init(items); // M : Materialize library et Collapsible une instance de la classe Collapsible de Materialize qui permet de gérer les class collapsible et les afficher
 })
