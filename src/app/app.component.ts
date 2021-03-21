import { Component } from '@angular/core';
import  firebase from 'firebase';
import { environment } from "../environments/environment" ;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export  class AppComponent {
 

 constructor ()
 {  
  var config = {
    apiKey: "AIzaSyAn-OAex89zrYqBtMbn-hviGCxBxCHmmew",
    authDomain: "backpacker-mauritius.firebaseapp.com",
    databaseURL: "https://backpacker-mauritius-default-rtdb.firebaseio.com",
    projectId: "backpacker-mauritius",
    storageBucket: "backpacker-mauritius.appspot.com",
    messagingSenderId: "1051510831027",
    appId: "1:1051510831027:web:d2f0c5078e676eae263dc6",
    measurementId: "G-RPX2GNK8V9"
  };

 // firebase.initializeApp(config);
 //firebase.initializeApp(environment.firebaseConfig);
  
  // firebase.analytics();


 }

}
