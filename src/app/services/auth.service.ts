import { Injectable } from '@angular/core';
///import * as firebase from 'firebase';
import  firebase from 'firebase/app';




@Injectable()
export class AuthService {

  constructor() { }

  createNewUser(email: string, password: string) {
    return new Promise(
      (resolve, rejects) => {
        firebase.auth().createUserWithEmailAndPassword(email,password).then(
          () => {
            resolve();
          },
          (error) =>{
            rejects(error);
          }
        );
      }
    );
  }
  signInUser(email: string, password: string) {
    return new Promise(
      (resolve, rejects) => {
      firebase.auth().signInWithEmailAndPassword(email, password).then(
        () => {
          resolve();
              },
        (error) =>{
          rejects(error);
          }
        );
      }
    );
  }
  SignOutUser(){
firebase.auth().signOut();
  }
 
  
  
}
