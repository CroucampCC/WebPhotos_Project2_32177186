import firebase from "firebase/app";

import "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAn1nIl0DacbdsKSuwXE77kJv4F6fFWw2w",
    authDomain: "cmpg323-project2-9302d.firebaseapp.com",
    projectId: "cmpg323-project2-9302d",
    storageBucket: "cmpg323-project2-9302d.appspot.com",
    messagingSenderId: "270450840362",
    appId: "1:270450840362:web:0fa16e98648c1712648453",
    measurementId: "G-DCHJY3YMCV"
};




// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export {storage, firebase as default}