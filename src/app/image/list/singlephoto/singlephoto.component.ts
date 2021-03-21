import { Component, OnInit, Input } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { FormControl, FormGroup, NumberValueAccessor } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { interval, Subscription } from 'rxjs';
import { Photo } from 'src/app/models/Photo.model';

import { ImageService } from 'src/app/shared/image.service';
import firebase from 'firebase/app';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-singlephoto',
  templateUrl: './singlephoto.component.html',
  styleUrls: ['./singlephoto.component.css']
})
export class SinglephotoComponent implements OnInit {

  currentPhoto: Photo = null;
  category : string ;
  caption : string ;
  new_key : number;
commentaire : string;
  new_category : string ;
  new_caption : string ;
  my_email : string;
  photos: Photo[];
  photosSubscription: Subscription;
  photo: Photo;
  @Input()
  photoid : string ;
published: string ;
   
imagesUrl : any[] ;
//newindex :number = 0;
newindex :number ;
index: number = 0;

numImages: number;
imagesLoaded: number = 0;
loading: boolean = true;
photoDetailList : any[];
photolistbis :any [];
rowIndexArraybis:any [];
  message = '';
  pageOfItems: Array<any>;
  items = [];
  myGroup = new FormGroup({
    new_caption: new FormControl(),
    new_category : new FormControl(),
    photoid : new FormControl(),
    new_key  : new FormControl(),
    commentaire: new FormControl()
 });

  constructor(private route: ActivatedRoute,
    private photosService: ImageService, private firebase : AngularFireDatabase  ,     
    private router: Router) { }


  ngOnInit(){


    firebase.auth().onAuthStateChanged(
      (user) =>{
        if(user) {
         
          this.my_email = user.email;
          
         
       //  console.log( this.my_email );
    
        } else {
         
        }
      }
    );










    this.photo = new Photo('','','','','');
    this.message = '';
    /** Récupération de l'url */
    const id = this.route.snapshot.params['id'];
    this.photoid = id;
    this.newindex =  +this.photoid;
    this.new_key = +this.photoid;
   


//



///
this.photosService.getAll().snapshotChanges().pipe(
  map(changes =>
    changes.map(c =>
      ({ key: c.payload.key, ...c.payload.val() })
    )
  )
//).subscribe(data => {
 // this.photos_bis = data

 ).subscribe(data => {



  //this.photos_bis = data

 

 
  this.photolistbis = data
 
  //this.items = this.photos_bis;
  //this.items = Array(150).fill(0).map((x, i) => ({ id: (i + 1), name: `Item ${i + 1}`}));
  //this.items = data.map((x, i) => ({ id: (x.key), name: `Photo ${x.caption}`}));
  this.items = this.photolistbis



   

this.rowIndexArraybis = Array.from(Array(Math.ceil(this.photolistbis.length/6)).keys());

console.log ("rowIndexArraybis");
console.log (this.rowIndexArraybis);


});
//



























    
    
    /**l'ajout du signe plus avant l'id le transforme en numérique */
    this.photosService.getSinglePhoto(+id).then (
      (photo: Photo) => {this.photo = photo;
      

        this.commentaire = this.photo.commentaire;

     


        this.new_category = this.photo.category;
    this.new_caption = this.photo.caption;
      
      } ); 
      
  
    }



  



    onChangePage(pageOfItems: Array<any>) {
      // update current page of items
      this.pageOfItems = pageOfItems;
  }







    nextImage(){
      this.photosService.getAll().snapshotChanges().pipe(
        map(changes =>
          changes.map(c =>
            ({ key: c.payload.key, ...c.payload.val() })
          )
        )
      
       ).subscribe(data => {
       // this.photos_bis = data
      
        this.imagesUrl = data;
        this.numImages = this.imagesUrl.length ;
       
        /** 
        interval(20000).subscribe(() => {
          if (!this.loading)
          this.newindex =  this.index
          this.newindex = (this.newindex + 1) % this.numImages
          this.index = (this.index + 1) % this.numImages
         
        })*/
      
        
        this.newindex = (this.newindex + 1) % this.numImages
        this.index = (this.index + 1) % this.numImages
        
        

        this.photosService.getSinglePhoto(+this.newindex).then (
          (photo: Photo) => {this.photo = photo;
          
    
            this.commentaire = this.photo.commentaire;
    
            this.new_key = this.newindex;
    
    
            this.new_category = this.photo.category;
        this.new_caption = this.photo.caption;
        this.router.navigate(['/images', 'view', this.newindex]); 
          
          } ); 
/** 
          window.location.reload();
            this.router.navigate(['/images', 'view', this.newindex]); 
    */        
        
      });
      }
      //

previousImage(){
      this.photosService.getAll().snapshotChanges().pipe(
        map(changes =>
          changes.map(c =>
            ({ key: c.payload.key, ...c.payload.val() })
          )
        )
      
       ).subscribe(data => {
       // this.photos_bis = data
      
        this.imagesUrl = data;
        this.numImages = this.imagesUrl.length ;
       
        /** 
        interval(20000).subscribe(() => {
          if (!this.loading)
          this.newindex =  this.index
          this.newindex = (this.newindex + 1) % this.numImages
          this.index = (this.index + 1) % this.numImages
         
        })*/
      
        
        this.newindex = (this.newindex - 1) % this.numImages
      
        //this.index = (this.index + 1) % this.numImages
       
        

        this.photosService.getSinglePhoto(+this.newindex).then (
          (photo: Photo) => {this.photo = photo;
          
    
            this.commentaire = this.photo.commentaire;
    
            this.new_key = this.newindex;
    
    
            this.new_category = this.photo.category;
        this.new_caption = this.photo.caption;
        this.router.navigate(['/images', 'view', this.newindex]); 
          
          } ); 
/** 
          window.location.reload();
            this.router.navigate(['/images', 'view', this.newindex]); 
    */        
        
      });
      }

//

currentImage(key_id){
  this.photosService.getAll().snapshotChanges().pipe(
    map(changes =>
      changes.map(c =>
        ({ key: c.payload.key, ...c.payload.val() })
      )
    )
  
   ).subscribe(data => {
   // this.photos_bis = data
  
    this.imagesUrl = data;
    this.numImages = this.imagesUrl.length ;
   
    /** 
    interval(20000).subscribe(() => {
      if (!this.loading)
      this.newindex =  this.index
      this.newindex = (this.newindex + 1) % this.numImages
      this.index = (this.index + 1) % this.numImages
     
    })*/
  
    
   // this.newindex = (this.newindex ) % this.numImages
   this.newindex = (key_id) % this.numImages
    //this.index = (this.index + 1) % this.numImages
    console.log("this.index");
    console.log(this.index);
    console.log("this.newindex");
    console.log(this.newindex);
    

    this.photosService.getSinglePhoto(+this.newindex).then (
      (photo: Photo) => {this.photo = photo;
      

        this.commentaire = this.photo.commentaire;

     
        this.new_key = this.newindex;

        this.new_category = this.photo.category;
    this.new_caption = this.photo.caption;
    this.router.navigate(['/images', 'view', this.newindex]); 
      
      } ); 
/** 
      window.location.reload();
        this.router.navigate(['/images', 'view', this.newindex]); 
*/        
    
  });
  }








 



  ngOnChanges(): void {
    this.message = '';
    //this.currentTutorial = { ...this.tutorial };
    this.currentPhoto = { ...this.photo };
  }

  
  
  

  
  
  
  updatePublished(status): void {
    
   // this.photosService.update(this.photoid, { published: status })
    this.photosService.update(this.new_key.toString(), { published: status })
      .then(() => {
        window.location.reload();
        this.currentPhoto.published = status;
    
    
        this.message = 'The status was updated successfully!';
        
      })
      .catch(err => console.log(err));
  }

  
  
  
  
  
  
  //private whatEverName(projectKey) { 
   // this.photoid = projectKey; 
   // this.firebase.object('/Projects/' + this.photoid); 
  //} 
  
  
  
  updatePhoto(): void {

 
    const data = {
     
     
  /** title: this.currentTutorial.title,
      description: this.currentTutorial.description **/
      caption: this.new_caption,
      category: this.new_category,
      commentaire : this.commentaire
//      photoid : this.photoid,
    };


    
    


    //this.tutorialService.update(this.currentTutorial.key, data)
    this.photosService.update(
      
      //this.photosService.key, data)
      //this.photoid, data)
      this.new_key.toString(), data)
    .then(() => this.message = 'The photo was updated successfully!')
      .catch(err => console.log(err));
      window.location.reload();
    }






///
onMaj(){
this.photosService.updateComphoto(this.photoid  ,"mauritius_bis","mauritius_bis");
}

////
  onBack() {
    
    this.router.navigate(['/images', 'list']);
  }
  }
