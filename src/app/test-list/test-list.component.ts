import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommentaireService } from '../shared/commentaires.service';
import { QuestionService } from '../shared/questions.service';
import firebase from 'firebase/app';
import { Commentaire } from '../Models/Commentaire.model';
import { mergeAll, switchMap, tap  } from 'rxjs/operators'
import { uniq, flatten } from 'lodash'
import { combineLatest, forkJoin, Observable, of } from 'rxjs';
import { Question } from '../Models/Question.model';
import { map } from 'rxjs/operators'
import 'rxjs/add/observable/forkJoin';

@Component({
  selector: 'app-test-list',
  templateUrl: './test-list.component.html',
  styleUrls: ['./test-list.component.scss']
})
export class TestListComponent implements OnInit {
  rawData : Observable<any> ;
  mes_commentaires : any[];
  childData : any[];
  rawData1 : any [];
  getOrders$: Observable<any>
  joined$: Observable<any>
  private firePath = '/questions';
  isSubmitted : boolean ;
  questionid: any;
  cartFirebase : any;
  questionDetailList : AngularFireList<Question> = null ;
  //questions: Observable<Question[]>;
  questions: [];
  Question: Observable<Question>;
  commentaireids:any [];
 MesQuestions: any [];
 MesQuestions1 :any[];
 usersList :any[];
 cart: Observable<any>;
  qr : string ;
  compteur:any[];
  questionids: any[];
commentaireDetailList : AngularFireList<Commentaire> = null; 
reactiveForm: FormGroup;
my_qr : string;
my_key : string;
commentaireForm: FormGroup;
commentaire : string ;
comment_bis :any [];
my_comment :string ;
  constructor(private service: QuestionService, private serviceC: CommentaireService ,private router: Router,
    private fb:FormBuilder,private af:AngularFireDatabase,public db: AngularFireDatabase) { 
      
      this.reactiveForm = this.fb.group({
            
        author: [''],
        question: [''],
        questionid: [''],
        datepublished: [''],
        
        skills: this.fb.array([]) 
        
        
      });



    }

  ngOnInit() {



    this.commentaireForm=this.fb.group({
      author: ['', [Validators.required]],
      commentaire: ['', [Validators.required]],
      datepublished : [''],
      commentaireid: ['']
     

    });


  /**
   * let category$ = Observable.of({id: 1});
let products$ = Observable.from([{name: 'will be included', cat_ids: [1, 5]}, {name: 'nope', cat_ids: [2, 3]}, {name: 'also yep', cat_ids: [1, 7]}]);

return Observable.combineLatest(products$, category$)
  .filter(([product, category]) => {
    return product.cat_id.some(id => id === category.id);
  })
  .map(([product, category]) => product);
   */



   /**
    //this.qr = "one73" ;
    reactiveForm: FormGroup;
    const getOrders$ = this.db.list('/questions/QR/').valueChanges();
    const getCustomerChangesById = commentaireid => this.db.object('commentaires/' + commentaireid + '/' ).valueChanges()
  // const getCustomerChangesById = commentaireid => this.db.object('commentaires/' + [1] + '/' ).valueChanges()
    this.rawData = getOrders$.pipe(
      switchMap(questions => { 
         const commentaireids = uniq(questions.map((ord: Question) => ord.questionid));
         .

        return commentaireids.map(getCustomerChangesById);
        //return commentaireids;
        
      }),tap(console.log),
      mergeAll()
    ); 
      */
    // **/

   /** 
    this. commentaireDetailList = this.db.list('/commentaires') ;
    
    this. questionDetailList = this.db.list('/questions') ;
   
    //this.joined$ = this.af.collection<Commentaire>('commentaires').valueChanges()
   //get all commentaires 1
    this.joined$ = this.commentaireDetailList.valueChanges()
    .pipe(
            switchMap(commentaires => {//swich map to get all commentairesid  with uniq to avoid retriving twice 2 
          //  const commentaireids = uniq(commentaires.map(bp => bp.commentaireid));
            const commentaireids = [0];
       console.log("commentaireids");
       console.log(commentaireids);
                                        return combineLatest( //combine to return all data
                                                of(commentaires),
                                                                  combineLatest(  
                                                                                  // commentaireids.map(commentaireid =>
                                                                                      //this.af.collection<Question>('questions', ref => ref.where('questionid', '==', commentaireid)).valueChanges().pipe(
                                                                                    /**    commentaireids.map(commentaireid => 
                                                                                      this.service.getAll().valueChanges().pipe(
                                                                                      map(questions => questions[0])
                                                                                      )
                                                                                    ) **/
                                                                                   /**   commentaireids.map(commentaireid =>
                                                                                      
                                                                                      this.service.getAll().valueChanges().pipe(
                                                                                     // map(questions => questions[0])
                                                                                     map(
                                                                                      (questions: Question[]) => questions.filter((question: Question) => commentaireid === question.questionid ))
                                                                                    
                                                                                      )
                                                                                      
                                                                                    ) 
            
////
                                                                                    commentaireids.map(commentaireid => this.questionDetailList.snapshotChanges().pipe(
                                                                                      map(changes => {
                                                                                      return changes.map(
                                                                                        questions  =>{

                                                                                          (questions: Question[]) => questions.filter((question: Question) => commentaireid === question.questionid);
                                                                                    
                                                                                          const datatest = questions.payload.val() as Question;
                                                                                       //   console.log ("datatest");
                                                                                      //    console.log (datatest);
                                                                                              a => {
                                                                                       
                                                                                        const data = a.payload.val() as Question;
                                                                                      // data.questionid = a.payload.key;
                                                                                    //  console.log ("data");
                                                                                    //  console.log (data.author);
                                                                                      
                                                                                        return data;
                                                                                                    }
                                                                                                    
                                                                                      })})) )  
/////
                                                                                      commentaireids.map(commentaireid =>
                                                                                      this.questionDetailList.snapshotChanges().pipe(
                                                                                        map(changes => {
                                                                                        return changes.map(a => {
                                                                                          (questions: Question[]) => questions.filter((question: Question) => "commentaireid" === question.questionid )
                                                                                    
                                                                                         
                                                                                          const data = a.payload.val() as Question;
                                                                                        // data.questionid = a.payload.key;
                                                                                        console.log ("data");
                                                                                        console.log (data);
                                                                                        
                                                                                          return data;
                                                                                        })
                                                                                      })) )  //

            )
        )
      }),

      //début du mappage
      map(([commentaires, questions]) => {

        return commentaires.map(commentaire => {
         
         
          return {
            ...commentaire,
           // (questions: Question[]) => questions.filter((question: Question) => commentaireid === question.questionid);
            //question: commentaires.find(a => a.questionid === commentaire.commentaireid)
           // author: authors.find(a => a.id === blogPost.authorId)
          }
        })


      })
    )

    
   



//

    
  





/**
 this.data.getArticles().pipe(
  map(
    (articles: Article[]) => articles.filter(
      (article: Article) => article.author === 'John Doe'
    )
  )
).subscribe(
  (articles: Article[]) => {
    this.articles = articles;
  }
);
 */



this.db.list('/questions/QR/').snapshotChanges().pipe(
  map(changes =>
    changes.map(c =>
      ({ key: c.payload.key })//, ...c.payload.val() })
    )
  )
//).subscribe(data => {
 // this.photos_bis = data

 ).subscribe(data => {

//console.log ("data");
//console.log (data);
  //this.photos_bis = data

  
  this.MesQuestions1 = data
  this.compteur = Array.from(Array(Math.ceil(this.MesQuestions1.length / 3)).keys());
})




this.db.list('/questions/QR/').valueChanges().subscribe(items => {
this.MesQuestions = <Question[]>items;
 
 
  console.log("this.MesQuestions");
  console.log(this.MesQuestions);
});




/** 

//this.rawData = this.db.list('/questions/QR/'+  this.qr + '/').valueChanges().pipe(
  this.rawData = this.db.list('/questions/QR/' + this.qr).valueChanges().pipe(
  //  this.rawData = this.db.list('/questions/' + "one73").valueChanges().pipe(
  switchMap(orders => { const commentaireids = uniq(orders.map((ord: Question) => ord.questionid));
    console.log("commentaireids");
    console.log(commentaireids);
    //console.log("this.qr");
    //console.log(this.qr);
   // return this.db.object('commentaires/' + commentaireids [1] + '/').valueChanges();} )
   return this.db.object('commentaires/' + this.qr + '/').valueChanges();} )
  //return this.db.object('commentaires/' + commentaireids [0] + '/').valueChanges();} )

); 

**/

















/**

    var commentaires = firebase.database().ref().child('commentaires');
    var questions = firebase.database().ref().child('questions');

            commentaires.on('child_added',snap => {
              

              questions.child(snap.val().commentaireid).once('value' , question => {
                
                console.log("question bis snap.val()");
              console.log(question.val());
              
              });

              console.log("question bis snap.val()");
              console.log(snap.val());

            });

 */
            
            
             
            


  }

  list_comment(qr){
    this.serviceC.getAll1().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    //).subscribe(data => {
     // this.photos_bis = data
    
     ).subscribe(data => {
    
    
      this.comment_bis = data.filter(e => e.commentaireid === qr)
    
    });
    this.listquestion(qr);
         
    this.scrollbarTop();     

    }


  





  OnDelCom( my_qr,my_key) {
console.log("on del com my_qr,my_key");
   console.log(my_qr);
   console.log(my_key);
      this.serviceC.delCom(my_qr,my_key);
this.router.navigate(['/images','test_list']);
       //   window.location.reload();
        
    }

    OnDelCom1( my_key) {
      console.log("on del com my_qr,my_key");
         
         console.log(my_key);
            this.serviceC.delCom1(my_key);
      this.router.navigate(['/images','test_list']);
             //   window.location.reload();
              
          }

   

  

  OnViewCom( my_qr) {
    //this.router.navigate(['/images','test_list']);
    //window.location.reload();
    this.qr = my_qr; 
   
    this.checkcom() ;

    }

  
    OnNewCom( my_qr) {
      
     
      this.qr = my_qr;  

      console.log ( "on new com this.qr"  );
      console.log ( this.qr  );
     // this.checkcom() ;
  this.onSaveCommentaire(this.qr);
 
 this.router.navigate(['/images','test_list']);
// this.router.navigate(['/images','Question']);
 //window.location.reload();
      }

    /**  listquestion(qr) {
        // Loop through users in order with the forEach() method. The callback provided
        // to will be called synchronously with a DataSnapshot for each child:
        var query = firebase.database().ref('/questions/QR/' + qr).orderByKey();
        query.once("value")
          .then(function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
              // key will be "ada" the first time and "alan" the second time
              var key = childSnapshot.key;
              // childData will be the actual contents of the child
              var childData = childSnapshot.val();
              
              
              console.log("key,childData");
              console.log(key);
        console.log(childData.question);
          });
        });
        }  */

        
      
        
        
        
        
        
        
        
        
        listquestion(qr) {
       
          firebase
            .database()
            .ref('questions/QR/' + qr + '/')
            .on('value', snapshot => {
              this.childData = [];  //<-- init to empty array
              snapshot.forEach( childSnapshot => {
                this.childData.push({
                  question: childSnapshot.val().question,
                  questionid: childSnapshot.val().questionid,
                  datepublished : childSnapshot.val().datepublished,
                  author : childSnapshot.val().author,
                  id: childSnapshot.key
                })
              })

              
              console.log ("this.childData");
              console.log (this.childData);
  
            });
            
        }
     
     
      // this.qr ='Q3u20';

      initUsers(qr) {
       
        firebase
          .database()
          .ref('commentaires/REP/' + qr + '/')
          .on('value', snapshot => {
            this.usersList = [];  //<-- init to empty array
            snapshot.forEach( childSnapshot => {
              this.usersList.push({
                commentaire: childSnapshot.val().commentaire,
                commentaireid: childSnapshot.val().commentaireid,
                datepublished : childSnapshot.val().datepublished,
                author : childSnapshot.val().author,
                id: childSnapshot.key
              })




            })
            console.log ("this.usersList");
            console.log (this.usersList);

          });

         this.listquestion(qr);
         
        this.scrollbarTop();     
      }
    
    reloadPage(){
      window.location.reload();
    }











   checkcom() {
//this.rawData = this.db.list('/questions/QR/'+  this.qr + '/').valueChanges().pipe(
  this.rawData = this.db.list('/questions/QR/' + this.qr).valueChanges().pipe(
    //  this.rawData = this.db.list('/questions/' + "one73").valueChanges().pipe(
    switchMap(orders => { const commentaireids = uniq(orders.map((ord: Question) => ord.questionid));
      console.log("commentaireids");
      console.log(commentaireids);
      //console.log("this.qr");
      //console.log(this.qr);
     // return this.db.object('commentaires/' + commentaireids [1] + '/').valueChanges();} )
     //return this.db.object('commentaires/REP/' + this.qr + '/').valueChanges();} )
     
     
     
     
     return this.db.object('commentaires/REP/' + this.qr + '/').valueChanges();
    
    } )
    
     //return this.db.object('commentaires/' + commentaireids [0] + '/').valueChanges();} )
    //const tasks: Observable<Task[]> = this.firestore.collection<Task>('tasks').valueChanges({ idField: 'id' });
  ); 
 
  this.scrollbarTop();
  
    }

    scrollbarTop(){

      window.scroll(0,0);
    }


    get formControls(){
      return this.commentaireForm['controls'];} 

    onSaveCommentaire(qr) {
      this.isSubmitted = true;
      if(this.commentaireForm.valid) {

      const author = this.commentaireForm.get('author').value;
      const commentaire = this.commentaireForm.get('commentaire').value;
      const datepublished = this.currentDate;
      const commentaireid = qr;
    
      const newCommentaire = new Commentaire(author, commentaire,datepublished,commentaireid); 
      
      this.serviceC.createNewCommentaire(newCommentaire); 
      
      
      this.router.navigate(['/images','test_list']);
//      window.location.reload();
      this.resetForm()
     
      }
    }
      //currentDate = new Date();
      currentDate : number = Date.now();

resetForm(){
    this.commentaireForm.reset();
    this.commentaireForm.setValue({
      author:'',
      commentaire:'',
      datepublished:'',
      commentaireid:'',
    });
    this.isSubmitted = false ;
  }    



}
