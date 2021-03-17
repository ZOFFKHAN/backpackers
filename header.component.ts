import { Component, OnInit } from '@angular/core';
import firebase from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";
import { from } from 'rxjs';
import { AuthService } from '../services/auth.service';


















@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
isAuth: boolean;
my_email : string ;
displayname : string;
phonenumber : string;

  constructor(private authService: AuthService  , public afAuth: AngularFireAuth ) { 
   
   

  }
 
  ngOnInit(){

  
    
   


firebase.auth().onAuthStateChanged(
  (user) =>{
    if(user) {
      this.isAuth = true;
      this.my_email = user.email;
      this.displayname = user.displayName;
      this.phonenumber = user.phoneNumber;
      console.log ( "this.displayname" );
      console.log (user.displayName);
     console.log( this.my_email );

    } else {
      this.isAuth = false;
    }
  }
);

  }

  async UpdateProfile() {
    const profile = {
        displayName: 'Visitor',
        phoneNumber :'0612718240',
        photoURL:''
       // photoURL: "https://example.com/jane-q-user/profile.jpg"
    }
    return (await this.afAuth.currentUser).updateProfile(profile);
}





  onSignOut () {
  this.authService.SignOutUser() ;
}


}
