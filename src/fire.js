import * as firebase from 'firebase';
//import withFirestore from 'react-with-firestore';

require("firebase/firestore");
const config = {
  apiKey: "AIzaSyB9oFuT0RMGqk_-Dvfc1dpwVz74tSMI_ww",
  authDomain: "reactivation-7bfc5.firebaseapp.com",
  databaseURL: "https://reactivation-7bfc5.firebaseio.com",
  projectId: "reactivation-7bfc5",
  storageBucket: "reactivation-7bfc5.appspot.com",
  messagingSenderId: "280521103101"
};
const fire = firebase.initializeApp(config);
const firestore = fire.firestore();


// Initialize Cloud Firestore through Firebase


export default firestore
