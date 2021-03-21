import { Component, OnInit } from '@angular/core';
import { AngularFireStorage, AngularFireStorageModule } from '@angular/fire/storage';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import{ finalize } from "rxjs/operators";
import { ImageService } from 'src/app/shared/image.service';
@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})
export class ImageComponent implements OnInit {
imgSrc : string ;
SelectedImage: any = null;
isSubmitted : boolean ;


formTemplate = new FormGroup({
 // caption : new FormControl('',Validators.required),
  caption : new FormControl('',(Validators.required,Validators.maxLength(10))),
  category : new FormControl(''),
  imageUrl : new FormControl('',Validators.required)
})
  constructor(private storage:AngularFireStorage , private service: ImageService) { }

  ngOnInit() {

    this.resetForm();
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
onSubmit(formValue){
this.isSubmitted = true;
if(this.formTemplate.valid){
  // on défini le nom du fichier pour firebase avec la date afin d'eviter les doublons
  // dans un répertoire bien précis
//var filePath = 'images/$(this.SelectedImage.name)_$(new Date().getTime())'
// dans un répertoire par catégorie bien précis
var filePath = formValue.category  + '/' + this.SelectedImage.name.split('.').slice(0,-1).join('.') + '_' + new Date().getTime();
const fileRef = this.storage.ref(filePath);
this.storage.upload(filePath,this.SelectedImage).snapshotChanges().pipe(
  finalize(()=>{
    fileRef.getDownloadURL().subscribe((url)=>{
formValue['imageUrl']=url;
this.service.insertImageDetails(formValue);


this.resetForm();
})
  })
).subscribe();
}

}
get formControls(){
  return this.formTemplate['controls'];} 

  resetForm(){
    this.formTemplate.reset();
    this.formTemplate.setValue({
      caption:'',
      imageUrl:'',
      category:'Mauritius'
    });
this.imgSrc = '/assets/img/imageplaceholder.png';
this.SelectedImage = null;
this.isSubmitted = false ;

}
}
