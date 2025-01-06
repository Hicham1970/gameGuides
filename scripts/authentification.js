import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signOut,
    signInWithEmailAndPassword,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
import {
    getFirestore,
    collection,
    getDocs,
    addDoc
} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDZUTf5YKkQyP2F8-eNSt8gaTIWNSsJhX0",
    authDomain: "game-guidez-65994.firebaseapp.com",
    projectId: "game-guidez-65994",
    storageBucket: "game-guidez-65994.firebasestorage.app",
    messagingSenderId: "907746785564",
    appId: "1:907746785564:web:f2d8a6831ea50689ec22d9"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);


// Ajouter les guides a partir la base de données Firestore et la collection guides:
// On va utiliser la fonction setupGuides() qui se trouve dans le fichier index.js
const guidesRef = collection(db, 'guides');
getDocs(guidesRef)
    .then((Snapshot) => {
       setupGuides(Snapshot.docs);
     })




// Listen to the auth state
auth.onAuthStateChanged((user) => {
    if (user) {
        // User is signed in means the user exists in the database
        console.log('After the Auth State Change the User is signed in:', user);
        // You can update the UI or perform other actions here
    } else {
        // User is signed out
        console.log('User is signed out from the auth state change', user);
        // You can update the UI or perform other actions here
    }
 })




// Sign up
const signupForm = document.getElementById('signup-form');
signupForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const email = signupForm['signup-email'].value;
    const password = signupForm['signup-password'].value;

    createUserWithEmailAndPassword(auth, email, password)
        .then((cred) => {
            console.log(cred.user);
            // Enregistrer l'utilisateur dans Firestore
            const userRef = collection(db, 'users');
            addDoc(userRef, {
                email: email,
                password: password
            })
            .then(() => {
                console.log('Utilisateur enregistré avec succès');
                // Rediriger vers la page d'accueil
                window.location.href = 'index.html';
                // Afficher un message de confirmation
                M.toast({
                    html: 'Votre compte a été créé avec succès',
                    classes: 'green'
                });
                
            })
                .catch((error) => {
                    console.error('Erreur lors de l\'enregistrement de l\'utilisateur', error);
                });
        })
        .catch((error) => {
            console.error('Erreur lors de la création de l\'utilisateur', error);
        });
});


// Logout
// prendre une reference pour le logout dans le html
const logout= document.querySelector('#logout');
logout.addEventListener('click', function (e) {
    e.preventDefault();
    auth.signOut().then(() => {
        // on peut faire disparaître du contenu de la page qui est réservé aux utilisateurs connectés
        console.log('User signed out after the Click on the logout button');
    })
});


// Login
const loginForm = document.getElementById('login-form');

if (loginForm) { // Check if loginForm exists to prevent errors
  loginForm.addEventListener('submit', (event) => {
      event.preventDefault();
      console.log(auth); // Check if auth object is initialized correctly
      console.log(signInWithEmailAndPassword); // Check if the function is imported correctly

    const email = loginForm['login-email'].value;
    const password = loginForm['login-password'].value;

    signInWithEmailAndPassword(auth, email, password) // Pass 'auth' as the first argument
        .then((cred) => {
        console.log('User signed in:', cred.user);

        // Close the login-form Modal (Check if modal and instance exist)
            const modal = document.querySelector('.modal-login');
        if (modal) {
            const instance = M.Modal.getInstance(modal);
          if (instance) {
            instance.close();
          }
        }
        // Clear the form
        loginForm.reset();

        // Consider using a more robust way to handle success, like a redirect
        // after a small delay to ensure everything is processed.
        setTimeout(() => {
            window.location.href = 'index.html';
          // Show success toast outside the setTimeout to prevent issues with modal closing
          M.toast({ html: 'Vous êtes connecté avec succès', classes: 'green' });
        }, 200); // 200ms delay
      })
        .catch((error) => {
        console.error('Login Error:', error);
        // Display error message to the user, e.g., using M.toast
        M.toast({ html: 'Erreur de connexion. Vérifiez vos identifiants.', classes: 'red' });
        });
});
}
