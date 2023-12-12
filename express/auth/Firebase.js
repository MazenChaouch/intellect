import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBETeS9DUua5VIOkrn3TeND8Raxdg6EdAU",
    authDomain: "intellect-academy-db46c.firebaseapp.com",
    projectId: "intellect-academy-db46c",
    storageBucket: "intellect-academy-db46c.appspot.com",
    messagingSenderId: "163609053597",
    appId: "1:163609053597:web:93c4daf221f1260609c774",
    measurementId: "G-6300EHQ3NZ"
};

const app = initializeApp(firebaseConfig);
export const fireStore = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
