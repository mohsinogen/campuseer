import firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyC2_5wC6Lrg0-kEXASunAgjajUgX90PVrI",
  authDomain: "my-bucket-a9016.firebaseapp.com",
  projectId: "my-bucket-a9016",
  storageBucket: "my-bucket-a9016.appspot.com",
  messagingSenderId: "647323027699",
  appId: "1:647323027699:web:96ccd6477202d3f7b34f86",
};
firebase.initializeApp(firebaseConfig);
var storage = firebase.storage();
export default storage;
