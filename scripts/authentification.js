import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";

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

// Sign up
const signupForm = document.getElementById('signup-form');
signupForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const email = signupForm['signup-email'].value;
    const password = signupForm['signup-password'].value;

    createUserWithEmailAndPassword(auth, email, password)
        .then((cred) => {
            console.log(cred);
            // Enregistrer l'utilisateur dans Firestore
            const userRef = collection(db, 'users');
            addDoc(userRef, {
                email: email,
                password: password
            })
                .then(() => {
                    console.log('Utilisateur enregistré avec succès');
                })
                .catch((error) => {
                    console.error('Erreur lors de l\'enregistrement de l\'utilisateur', error);
                });
        })
        .catch((error) => {
            console.error('Erreur lors de la création de l\'utilisateur', error);
        });
});