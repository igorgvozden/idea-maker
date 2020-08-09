import * as firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import "firebase/firestore";
 
// Your web app's Firebase configuration
let firebaseConfig = {
  apiKey: "AIzaSyBS3P4sohHR3secXDMb7slPgtk5O7LEOww",
  authDomain: "ideas-e7165.firebaseapp.com",
  databaseURL: "https://ideas-e7165.firebaseio.com",
  projectId: "ideas-e7165",
  storageBucket: "ideas-e7165.appspot.com",
  messagingSenderId: "206868117640",
  appId: "1:206868117640:web:92e2adc87755c7e0c2473d"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

let database = firebase.database();

export { database }; 