import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword,
  GoogleAuthProvider, signInWithPopup, signInWithRedirect, getRedirectResult } from './firebase-imports.js';
import { showChange } from '../router.js';

// Creacion de un usuarios.
export const createUser = (email, password, name, lastName) => {
  const auth = getAuth();
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      alert(`Hola ${name} ${lastName} bienvenido a Latam sin fronteras, confirma tu correo.`);
      sendEmailVerification(auth.currentUser)
        .then(() => {
          // Email verification sent!
        });
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage, errorCode);
      if (errorCode === 'auth/invalid-email') {
        alert('El correo no es válido');
      } else if (errorCode === 'auth/weak-password') {
        alert('Su contraseña es débil');
      } else if (errorCode === 'auth/email-already-in-use') {
        alert('El correo ya esta en uso');
      }
    });
};

// Inicio de Sesion con Email y  Contraseña.
export const signIn = (email, password) => {
  const auth = getAuth();
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      showChange('#/muro');
      console.log("Inicio " + user);
      // window.history.pushState(null, ' ', '#/muro');
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage, errorCode);
    });
};

// Inicio de Sesion con Google.
export const signInGoogle = () => {
  const provider = new GoogleAuthProvider();
  provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
  const auth = getAuth();
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      
      // ...
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });

  signInWithRedirect(auth, provider);

  getRedirectResult(auth)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access Google APIs.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;

      // The signed-in user info.
      const user = result.user;
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
};
