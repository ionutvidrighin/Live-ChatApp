import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyCWDM90NESbd5NDC_Ufu8pX750YV5d-omY",
  authDomain: "new-live-chat-28f02.firebaseapp.com",
  projectId: "new-live-chat-28f02",
  storageBucket: "new-live-chat-28f02.appspot.com",
  messagingSenderId: "486115708113",
  appId: "1:486115708113:web:398898ba6c06eb10f809f0",
  measurementId: "G-8EPGLEV75J"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const provider = new firebase.auth.GoogleAuthProvider();
const dataBase = firebaseApp.firestore();
export const auth = firebase.auth();
export const signIn = async () => {
  await auth.signInWithPopup(provider)
}

export default dataBase;