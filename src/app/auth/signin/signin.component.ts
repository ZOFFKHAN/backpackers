import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { interval, observable, Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Photo } from 'src/app/models/Photo.model';
import { AuthService } from 'src/app/services/auth.service';
import { ImageService } from 'src/app/shared/image.service';
import firebase from 'firebase/app';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuth }  from '@angular/fire/auth';
import { NgModule } from '@angular/core';
import { DisableRightClickModule } from 'src/app/services/DisableRightClickModule';


@NgModule({
  declarations: [
  ],
  imports: [
    DisableRightClickModule
  ]
})
export class SomeDummyModule {
}
///


















@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit,OnDestroy {

  signInForm: FormGroup;
  errorMessage: string ;
  photo: Photo;
  photos: Photo[];
  photos_bis: any[] ;
  
  photoaleaSubcription : Subscription;
  counterSubscription : Subscription;
  photoDetailList : any[];
  photolistbis :any [];
  rowIndexArraybis:any [];
  nbPhoto : number ;
  id : number;
  id1 : number;
  time$;
  isAuth: boolean;
my_userid : string ;
  
  constructor(private formBuider: FormBuilder,
              private authService: AuthService,
              private router: Router,
              private photosService: ImageService,
              private route: ActivatedRoute ,
              private af : AngularFireAuth  ) { }

  ngOnInit() {

/**l'ajout du signe plus avant l'id le transforme en numérique */
this.photo = new Photo('','','','','');
const id = 0;





const counter= interval(5000);

   this.aleainit();


   this.photosService.getSinglePhoto(id).then (
      (photo: Photo) => {this.photo = photo;} ); 

      this.counterSubscription = counter.subscribe(
        (value: number) => {
          this.getalea();
       }
       );
       
       this.photosService.photoDetailList.snapshotChanges().subscribe(
        list => {
      this.photolistbis = list.map(item => {return item.payload.val();}); // retourne une liste des catégory,caption,url
          this.rowIndexArraybis = Array.from(Array(Math.ceil(this.photolistbis.length / 3)).keys());

        }
      )
     
      



  





    this.initForm();
  }
  

  initForm(){
    this.signInForm=this.formBuider.group( {
    email: ["V.visitor@visitor.com",[Validators.required,Validators.email]],
    password: ["Visitor1*",[Validators.required,Validators.pattern(/[0-9a-zA-Z]{6,}/)]]
    
  }
  
  
  );


}
onSubmit() {
  const email = this.signInForm.get('email').value;
  const password = this.signInForm.get('password').value;


  this.authService.signInUser(email, password).then(
    () => {

     




      this.router.navigate(['/image','list']);
    },
    (error) => {
      this.errorMessage= error;
      
    }
  );
}

















entierAleatoire(min, max)
{
 return Math.floor(Math.random() * (max - min + 1)) + min;
}

//


isInit = false ;
	
	aleainit() {
		return new Promise(
		(resolve) => {
			setTimeout (
()	=> {
  this.isInit= true;
  
 this.getalea() ; 
	resolve(true);
	
}, 2000
			);
		}
		);
	}
	

getalea(){
 
  this.photosService.getSinglePhoto(this.entierAleatoire(0,15)).then (
   (photo: Photo) => {this.photo = photo;} ); 
}







ngOnDestroy() {
 
  this.counterSubscription.unsubscribe();

}

}


