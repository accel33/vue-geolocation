import firebase from 'firebase'
import firestore from 'firebase/firestore'

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyCirMzLkZt5RGyoYY9v1rOJ2lp5wxs-O-A",
    authDomain: "vue-geolocation-33.firebaseapp.com",
    databaseURL: "https://vue-geolocation-33.firebaseio.com",
    projectId: "vue-geolocation-33",
    storageBucket: "vue-geolocation-33.appspot.com",
    messagingSenderId: "627037131070",
    appId: "1:627037131070:web:c881e53d76df7459"
};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

export default firebaseApp.firestore()