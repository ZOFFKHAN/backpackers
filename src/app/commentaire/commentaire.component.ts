import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Commentaire } from '../Models/Commentaire.model';
import { Question } from '../Models/Question.model';
import { CommentaireService } from '../shared/commentaires.service';




@Component({
  selector: 'app-commentaire',
  templateUrl: './commentaire.component.html',
  styleUrls: ['./commentaire.component.scss']
})
export class CommentaireComponent implements OnInit {

  commentaireForm: FormGroup;
commentaire :string ;
  constructor(private formBuilder: FormBuilder,
    private router: Router, private commentairesService: CommentaireService ) { }

  ngOnInit() {

    this.initForm ();
  }
  initForm (){
    this.commentaireForm=this.formBuilder.group({
      author: ['',Validators.required],
      commentaire: ['',Validators.required],
      datepublished : ['',Validators.required],
      commentaireid: ['',Validators.required]


    });
  }
  onSaveCommentaire() {
  const author = this.commentaireForm.get('author').value;
  const commentaire = this.commentaireForm.get('commentaire').value;
  const datepublished = this.commentaireForm.get('datepublished').value;
  const commentaireid = this.commentaireForm.get('commentaireid').value;

  const newCommentaire = new Commentaire(author, commentaire,datepublished,commentaireid); 
  
  this.commentairesService.createNewCommentaire(newCommentaire); 
  
  
  this.router.navigate(['/images','Commentaire']);
  //window.location.reload();
  this.resetForm()
 
  }


 














  resetForm(){
    this.commentaireForm.reset();
    this.commentaireForm.setValue({
      author:'',
      commentaire:'',
      datepublished:'',
      commentaireid:'',
    });

  }

}
