// references pour les éléments HTML
const guidesListElement = document.querySelector(".guides");
const loginLinks = document.querySelectorAll(".logged-in");
const logoutLinks = document.querySelectorAll(".logged-out");
const accountDetails = document.querySelector(".account-details");

// Setup UI elements based on authentication state
const setupUI = (user) => {
  if (user) {
    // If the user is logged in
    // add the user Account infos:
    const html = `
    <div>Logged in with the email: ${user.email}</div>
    <div class="pink-text">The user's uid is: ${user.uid}</div>
    `;
    // update the account details div with the user account infos
    accountDetails.innerHTML = html;

    //  toggle UI elements
    loginLinks.forEach((item) => (item.style.display = "block"));
    logoutLinks.forEach((item) => (item.style.display = "none"));
    // User is signed out
  } else {
      // User is signed out
      // Hide the user's account infos
        accountDetails.innerHTML = "";
      // toggle UI elements
    loginLinks.forEach((item) => (item.style.display = "none"));
    logoutLinks.forEach((item) => (item.style.display = "block"));
  }
};

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
    guidesListElement.innerHTML =
      '<h5 class="center-align grey-text text-darken-2">Login to view guides if you have an account , if not, you are free to create one</h5>';
  }
};

// Initialisation des composants Materialize au chargement de la page
document.addEventListener("DOMContentLoaded", function () {
  var modals = document.querySelectorAll(".modal");
  M.Modal.init(modals); // M : Materialize library et Modal une instance de la classe Modal de Materialize qui permet de gérer les modals et les afficher

  var items = document.querySelectorAll(".collapsible");
  M.Collapsible.init(items); // M : Materialize library et Collapsible une instance de la classe Collapsible de Materialize qui permet de gérer les class collapsible et les afficher
});
