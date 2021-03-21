import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

import { Subject } from 'rxjs';

import firebase from 'firebase/app';
import { Question } from '../Models/Question.model';
import { CommentaireService } from './commentaires.service';




@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  

  //private firePath = '/questions/QR/'+ "zof50";
  private firePath = '/questions';


  questions: Question[] = [];
  questionsSubject = new Subject <Question[]>();
 
  questionDetailList : AngularFireList<Question> = null;
 
  
  imageDetailList1 :AngularFireList<Question[]>;
  
  imageDetailList: AngularFireList<any>;

  caption : string ;
  category :string ;
  newQuestion :[];
  
  Qfile :string;


  


  constructor(private firebase: AngularFireDatabase, private SC : CommentaireService ) { this. questionDetailList  = firebase.list(this.firePath);}
 
  emitQuestions() {
    this.questionsSubject .next(this.questions)
 }



 //saveQuestions(Qfile : string) {
  saveQuestions() {
  /** insere les questions avec set dans le répertoire /questions */
     // firebase.database().ref('/questions/').set(this.questions);    
    firebase.database().ref('/questions/QR/'+ this.Qfile).set(this.questions);    
    
    
    
    //firebase.database().ref('/questions/'+ Qfile).set(this.questions); 

    
 //firebase.database().ref('/questions/').set(this.questions); 
 
   // firebase.database().ref('/questions').child(this.Qfile).set(this.questions); 
   
    
     //firebase.database().ref('/questions/0').child(Qfile).update(this.questions)
    }


 getQuestions() {
  firebase.database().ref('/questions')
  .on('value', (data) => {
    /****si les books sont vides renvoyer un array vide */
    //avec .on
    this.questions = data.val() ? data.val() : [];
    this.emitQuestions();
 
  });
}  

getSingleQuestion(id: number) {//méthode asyncrone
  return new Promise(
    (resolve, reject) => {
    firebase.database().ref('/questions/' + id).once('value') .then(//.once à la place de .on
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
  
  return this.questionDetailList .update(key, value);
  
}






//


getAll(): AngularFireList<Question> {
  return this.questionDetailList ;
}

create(photo: Question): any {
  return this.questionDetailList .push(photo);
  
}









//

//






delete(key: string): Promise<void> {
  return this.questionDetailList .remove(key);
}

deleteAll(): Promise<void> {
  return this.questionDetailList .remove();
}




//



/**var johnRef = firebase.database().ref("players/John");

johnRef.update ({
   "number": 10
});**/


updateComphoto(id,category_bis,caption_bis ) {
  firebase.database().ref("questions/" + id).set({
    caption: caption_bis,
    category: category_bis
    
  });
 

}


//



//






//createNewQuestion(Qfile : string , newQuestion: Question) {
  createNewQuestion(newQuestion: Question) {
  /**ajout du livre par push, save,emit */
  
  this.Qfile = newQuestion.questionid;
  this.questions.push(newQuestion);
  this.saveQuestions();
  
  
  
  
 

 this.emitQuestions();

 


}










getquestionDetailList(){
  this.questionDetailList  = this.firebase.list('questions');
  
  
  }



getImageDetailList1(){
  this.imageDetailList1 = this.firebase.list('questions');
  
 
  }

 getImageDetailList(){
this.imageDetailList = this.firebase.list('imageDetails');


}

  insertImageDetails(imageDetails){
    this.imageDetailList.push(imageDetails);



    
   
  }

  
}
