import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

import { Subject } from 'rxjs';

import firebase from 'firebase/app';

import { Commentaire } from '../Models/Commentaire.model';




@Injectable({
  providedIn: 'root'
})
export class CommentaireService {

  
  private firePath = '/commentaires';
  private firePath1 = '/commentaires/REP_ARCH';

commentaires: Commentaire[] = [];
  commentairesSubject = new Subject <Commentaire[]>();
 
  commentaireDetailList : AngularFireList<Commentaire> = null;
  commentaireDetailList1 : AngularFireList<Commentaire> = null;
 
  
  imageDetailList1 :AngularFireList<Commentaire[]>;
  
  imageDetailList: AngularFireList<any>;

  caption : string ;
  category :string ;
  Qfile :string;
  my_uid : string;
  constructor(private firebase: AngularFireDatabase ) { this. commentaireDetailList  = firebase.list(this.firePath);this. commentaireDetailList1  = firebase.list(this.firePath1);}
 
  








  emitCommentaires() {
    this.commentairesSubject .next(this.commentaires)
 }
 
 
 saveCommentaires() {
   this.my_uid = '1';

  //const  dbRef = this.firebase.database.ref('/commentaires/REP/'+ this.Qfile);
  /** insere les questions avec set dans le répertoire /questions */
    //firebase.database().ref('/commentaires/' + this.Qfile).set(this.commentaires);  
     // firebase.database().ref('commentaires/').set(this.commentaires);  
    // firebase.database().ref('/commentaires').child('one91').set(this.commentaires); 
//firebase.database().ref('/commentaires').child(this.Qfile).set(this.commentaires); 

//dbRef.child(`1`).set(this.commentaires);
firebase.database().ref('/commentaires/REP/'+ this.Qfile ).set(this.commentaires);  
//firebase.database().ref('/commentaires/REP/'+ this.Qfile ).push(this.commentaires);    

     //firebase.database().ref('commentaires/alpha').set(this.commentaires); 
    
    }

   

    saveCommentaires1() {
      
   
     //const  dbRef = this.firebase.database.ref('/commentaires/REP/'+ this.Qfile);
     /** insere les questions avec set dans le répertoire /questions */
       //firebase.database().ref('/commentaires/' + this.Qfile).set(this.commentaires);  
        // firebase.database().ref('commentaires/').set(this.commentaires);  
       // firebase.database().ref('/commentaires').child('one91').set(this.commentaires); 
   //firebase.database().ref('/commentaires').child(this.Qfile).set(this.commentaires); 
   
   //dbRef.child(`1`).set(this.commentaires);
  //firebase.database().ref('/commentaires/REP/'+ this.Qfile ).set(this.commentaires); 
   firebase.database().ref('/commentaires/REP_ARCH/').set(this.commentaires);  
   //firebase.database().ref('/commentaires/REP/'+ this.Qfile ).push(this.commentaires);    
   
        //firebase.database().ref('commentaires/alpha').set(this.commentaires); 
       
       }


       









    
  // delCom(Qfile1: string,uid: string){ firebase.database().ref('/commentaires/REP/'+ Qfile1).child(uid).remove();}
  



  delCom(Qfile1: string,uid: string){ 
    firebase.database().ref('/commentaires/REP/'+ Qfile1).child(uid).remove();}

  delCom1(uid: string){ 
    firebase.database().ref('/commentaires/REP_ARCH/').child(uid).remove();}

   
   removeCom(commentaire: Commentaire) {


    const bookIndexToRemove = this.commentaires.findIndex(
      (bookEL) => {
        if(bookEL === commentaire ) {
          return true;
        }
      }
    );
  this.commentaires.splice(bookIndexToRemove,1);
  this.saveCommentaires();
  this.emitCommentaires();
  }








 getCommentaires() {
  firebase.database().ref('/commentaires')
  .on('value', (data) => {
    /****si les books sont vides renvoyer un array vide */
    //avec .on
    this.commentaires = data.val() ? data.val() : [];
    this.emitCommentaires();
 
  });
}  

getSingleCommentaire(id: number) {//méthode asyncrone
  return new Promise(
    (resolve, reject) => {
    firebase.database().ref('/commentaires/' + id).once('value') .then(//.once à la place de .on
      (data) => {
        resolve(data.val());
      },(error) => {
        reject(error);
      }
    );
    }
  );
}

update(key: string, value: any): Promise<void> {
  
  return this.commentaireDetailList .update(key, value);
  
}






//


getAll(): AngularFireList<Commentaire> {
  return this.commentaireDetailList ;
}

getAll1(): AngularFireList<Commentaire> {
  return this.commentaireDetailList1 ;
}

create(photo: Commentaire): any {
  return this.commentaireDetailList .push(photo);
  
}

//

//





delete(key: string): Promise<void> {
  return this.commentaireDetailList .remove(key);
}

deleteAll(): Promise<void> {
  return this.commentaireDetailList .remove();
}




//



/**var johnRef = firebase.database().ref("players/John");

johnRef.update ({
   "number": 10
});**/


updateComphoto(id,category_bis,caption_bis ) {
  firebase.database().ref("commentaires/" + id).set({
    caption: caption_bis,
    category: category_bis
    
  });
 

}


//



//

createNewCommentaire1(newCommentaire: Commentaire) {

  /**ajout du livre par push, save,emit */
  this.Qfile = newCommentaire.commentaireid;
  
  this.commentaires.push(newCommentaire);
  this.saveCommentaires();
  this.emitCommentaires();
}

createNewCommentaire(newCommentaire: Commentaire) {

  /**ajout du livre par push, save,emit */
  this.Qfile = newCommentaire.commentaireid;
 
  this.commentaires.push(newCommentaire);
  this.saveCommentaires1();
  this.emitCommentaires();
}










getcommentaireDetailList(){
  this.commentaireDetailList = this.firebase.list('commentaires');
  
  
  }



getImageDetailList1(){
  this.imageDetailList1 = this.firebase.list('commentaires');
  
 
  }

 getImageDetailList(){
this.imageDetailList = this.firebase.list('imageDetails');


}

  insertImageDetails(imageDetails){
    this.imageDetailList.push(imageDetails);



    
   
  }

  
}
