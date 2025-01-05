// Initialisation des modules 
document.addEventListener('DOMContentLoaded', function () {
    var modals = document.querySelectorAll('.modal');
    M.Modal.init(modals); // M : Materialize library et Modal une instance de la classe Modal de Materialize qui permet de gérer les modals

    var items = document.querySelectorAll('.collapsible');
    M.Collapsible.init(items); // M : Materialize library et Collapsible une instance de la classe Collapsible de Materialize qui permet de gérer les class collapsible
 })