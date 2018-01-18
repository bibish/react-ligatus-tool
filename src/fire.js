import * as firebase from 'firebase';
//import withFirestore from 'react-with-firestore';

require("firebase/firestore");
const config = {
  // HÉHÉÉÉÉÉÉÉÉÉÉÉ
};
const fire = firebase.initializeApp(config);
const firestore = fire.firestore();


// Initialize Cloud Firestore through Firebase


export default firestore
