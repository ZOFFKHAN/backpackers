import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Commentaire } from '../Models/Commentaire.model';
import { Question } from '../Models/Question.model';
import { CommentaireService } from '../shared/commentaires.service';
import { QuestionService } from '../shared/questions.service';


@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {

  questionForm: FormGroup;
question : string;
isSubmitted : boolean ;









Qfile :string ;
  constructor(private formBuilder: FormBuilder,
    private router: Router, private questionsService: QuestionService,private commentaireService: CommentaireService
    ) { }

  ngOnInit(){
    this.initForm ();
   
  }

  initForm (){
    this.questionForm=this.formBuilder.group({
      author: ['',Validators.required],
      question: ['',Validators.required],
      datepublished : [''],
      //questionid: ['',Validators.required]
      questionid: ['']

    });
  }









   left(str, chr) {
    return str.slice(0, chr - str.length);
  }

  entierAleatoire(min, max)
{
 return Math.floor(Math.random() * (max - min + 1)) + min;
}




get formControls(){
  return this.questionForm['controls'];} 


 




  //currentDate = new Date();
  currentDate : number = Date.now();
  
  onSaveQuestion() {
    this.isSubmitted = true;
    if(this.questionForm.valid) {
 
    const author = this.questionForm.get('author').value;
  const question = this.questionForm.get('question').value;
  const datepublished = this.currentDate;
 // const questionid = this.questionForm.get('questionid').value;


 const questionid = ('Q' + this.entierAleatoire(1,10) + this.questionForm.get('author').value).substring(0, 3) + this.entierAleatoire(1,1000) //;str.substring(0, 10);

  const newQuestion = new Question(author, question,datepublished,questionid); 
  const newCommentaire = new Commentaire('inconnu', 'pas de réponses',this.currentDate,questionid); 
  //this.questionsService.createNewQuestion(Qfile,newQuestion); 



  this.questionsService.createNewQuestion(newQuestion); 
//  this.commentaireService.createNewCommentaire1(newCommentaire);

 //this.questionsService.saveQuestions(Qfile);
 
  this.router.navigate(['/images','Question']);
  window.location.reload();
  this.resetForm()
  }
}
  
 
  resetForm(){
    this.questionForm.reset();
   
    this.questionForm.setValue({
      author:'',
      question:'',
      datepublished:'',
      questionid:''
    });
    this.isSubmitted = false ;
  }
  
}
