import  firebase from 'firebase';

export const environment = {
  production: false, 
  firebaseConfig : {
    apiKey: "AIzaSyDFDZxqxeTL34qprFzCO06nNi_0fx27OIM",
  authDomain: "backpacker-mauritius-c62f0.firebaseapp.com",
  databaseURL: "https://backpacker-mauritius-c62f0-default-rtdb.firebaseio.com",
  projectId: "backpacker-mauritius-c62f0",
  storageBucket: "backpacker-mauritius-c62f0.appspot.com",
  messagingSenderId: "708314225435",
  appId: "1:708314225435:web:d7ded74e73cd90d35a91be",
  measurementId: "G-E168YVJ4YD"
  }
};


// firebase.initializeApp(config);
firebase.initializeApp(environment.firebaseConfig);
