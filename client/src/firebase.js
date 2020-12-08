// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyA1elLWFOhhxCKc5aQoQu3krD1oWhJ0l3w",
    authDomain: "homework-app-5f1df.firebaseapp.com",
    databaseURL: "https://homework-app-5f1df.firebaseio.com",
    projectId: "homework-app-5f1df",
    storageBucket: "homework-app-5f1df.appspot.com",
    messagingSenderId: "563886228889",
    appId: "1:563886228889:web:7d8ff4d00bf07417b5bf08",
    measurementId: "G-BN9D59LFPM"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
export default db;
