// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDstYzYV8JhFE1kPl6WG_gJpsHNS0YuCmE",
  authDomain: "gs-timesheet.firebaseapp.com",
  projectId: "gs-timesheet",
  storageBucket: "gs-timesheet.appspot.com",
  messagingSenderId: "201548945844",
  appId: "1:201548945844:web:3ac2438fd608fc5a2ebae1",
  measurementId: "G-STQHXV0XV5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { app, storage };
