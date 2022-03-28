import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword,
  GoogleAuthProvider, signInWithPopup } from './firebase-imports.js';
import { showChange } from '../router.js';
import { mostrarErrores } from '../../main.js';

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
      mostrarErrores(errorCode);
     
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
      if (errorCode === 'auth/invalid-email') {
        alert('La dirección de correo electrónico no es válida.');
      }
      if (errorCode === 'auth/user-disabled') {
        alert('El usuario correspondiente al correo electrónico dado ha sido deshabilitado.');
      }
      if (errorCode === 'auth/user-not-found') {
        alert('No hay un usuario correspondiente al correo electrónico dado.');
      }
      if (errorCode === 'auth/wrong-password') {
        alert('La contraseña no es válida');
      }
    });
};

// Inicio de Sesion con Google.
export const signInGoogle = () => {
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  console.log('provider: ', provider);
  signInWithPopup(auth, provider)
    .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      console.log(`El usuario ${user} se ha autenticado!!!`);
      console.log('credenciales: ', credential, token);
      window.location = '#/muro';
      // showChange('#/muro')
    // ...
    }).catch((error) => {
    // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // eslint-disable-next-line no-console
      console.log(error);
      console.log('primero ', errorCode, 'segundo ', errorMessage);
    });
};