import { initializeApp } from 'firebase';

const app = initializeApp({
    apiKey: "AIzaSyBoLmDa1CqmRjABTJmoSAU0a05GvyUvinQ",
    authDomain: "abc-forchildren.firebaseapp.com",
    databaseURL: "https://abc-forchildren.firebaseio.com",
    projectId: "abc-forchildren",
    storageBucket: "abc-forchildren.appspot.com",
    messagingSenderId: "957240443515",
    appId: "1:957240443515:web:3bdefc43a4c357a1"
});

export const db = app.database();