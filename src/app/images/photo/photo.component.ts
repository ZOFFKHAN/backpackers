
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Photo } from 'src/app/models/Photo.model';
import { ImageService } from 'src/app/shared/image.service';
import{ finalize } from "rxjs/operators";
import { AngularFireStorage, AngularFireStorageModule } from '@angular/fire/storage';
import firebase from 'firebase/app';
@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.css']
})
export class PhotoComponent implements OnInit {
  imgSrc = '/assets/img/imageplaceholder.png';
  photoForm: FormGroup;
  fileIsUploading = false;
  fileUrl: string;
  fileUploaded = false ;
  SelectedImage: any = null;

  isSubmitted : boolean ;
  my_email: string;
  constructor(private formBuilder: FormBuilder,
    private imageService: ImageService,
    private router: Router,
    private storage:AngularFireStorage) { }

  ngOnInit() {
    this.initForm ();
  
  
    firebase.auth().onAuthStateChanged(
      (user) =>{
        if(user) {
         
          this.my_email = user.email;
          
         
         console.log( this.my_email );
    
        } else {
         
        }
      }
    );
  
  
  
  
  
  
  }



 




  initForm (){
    this.photoForm=this.formBuilder.group({
      category: ['',Validators.required],
     // caption: ['',Validators.required],
     caption : ['',[Validators.required,Validators.maxLength(14)]],
      imageUrl :[ '',Validators.required],
      author :[ ''],
     commentaire :[ '']
    });
  }

  showPreview (event: any){
    if (event.target.files && event.target.files[0]){
      const reader = new FileReader();
      reader.onload= (e: any) => this.imgSrc = e.target.result;
      reader.readAsDataURL(event.target.files[0]);
      this.SelectedImage = event.target.files[0];
    }
    else {
      this.imgSrc ='/assets/img/imageplaceholder.png';// si l'utilsateur annule sa sélection
      this.SelectedImage=null;
    }
  }

 //
 onSubmit(formValue){
  this.isSubmitted = true;
  if(this.photoForm.valid){

    const category = this.photoForm.get('category').value;
    const caption = this.photoForm.get('caption').value;
    const author = this.my_email;
    const commentaire = this.photoForm.get('commentaire').value;
    // on défini le nom du fichier pour firebase avec la date afin d'eviter les doublons
    // dans un répertoire bien précis
  //var filePath = 'images/$(this.SelectedImage.name)_$(new Date().getTime())'
  // dans un répertoire par catégorie bien précis
  var filePath = formValue.category  + '/' + this.SelectedImage.name.split('.').slice(0,-1).join('.') + '_' + new Date().getTime();
  console.log("filePath");
  console.log(filePath);
  
  const fileRef = this.storage.ref(filePath);
  this.storage.upload(filePath,this.SelectedImage).snapshotChanges().pipe(
    finalize(()=>{
      fileRef.getDownloadURL().subscribe((url)=>{
  formValue['imageUrl']=url;
 

  const imageUrl = formValue['imageUrl'];
  const newPhoto = new Photo(category, caption,imageUrl,author,commentaire);
  this.imageService.createNewPhoto(newPhoto); 
  this.router.navigate(['/image','list']);
  //
  
  this.resetForm();
  })
    })
  ).subscribe();
  }
  
  }
  resetForm(){
    this.photoForm.reset();
    this.photoForm.setValue({
      caption:'',
      imageUrl:'',
      category:'Mauritius'
    });
this.imgSrc = '/assets/img/imageplaceholder.png';
this.SelectedImage = null;
this.isSubmitted = false ;

}












 //
 
 
  onSavePhoto() {

    const category = this.photoForm.get('category').value;
    const caption = this.photoForm.get('caption').value;
    const imageUrl= this.fileUrl;
    //const author= this.photoForm.get('auteur').value;
  const author= this.my_email;
    
    const commentaire = this.photoForm.get('commentaire').value;
    const newPhoto = new Photo(category, caption,imageUrl,author,commentaire); 
    
    if(this.fileUrl && this.fileUrl!== '') {
      newPhoto.imageUrl =this.fileUrl;
      
    }
    if(this.my_email!==''){
      newPhoto.author= this.my_email;
    }
    this.imageService.createNewPhoto(newPhoto); 
    this.router.navigate(['/image','list']);
    }
    
///chargement effectuée dès que le champ pour l'url est rempli 

    detectFiles(event) {
      this.onuploadFile_photo(event.target.files[0]);
      }
  
    onuploadFile_photo(file: File) {
      this.fileIsUploading = true ;
     
      this.imageService.uploadFile_photo(file).then(
        (url: string ) => {
          this.fileUrl= url;
          console.log ("this.fileUrl");
          console.log (this.fileUrl);
          this.fileIsUploading = false;
          this.fileUploaded = true ;
    
    
        }
      );
    }
}
