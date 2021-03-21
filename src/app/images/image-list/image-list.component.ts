import { Component, OnDestroy, OnInit,DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { Key } from 'protractor';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Photo } from 'src/app/models/Photo.model';
import { ImageService } from 'src/app/shared/image.service';
import * as Lodash from 'lodash';
import { FormControl, FormGroup } from '@angular/forms';
import firebase from 'firebase/app';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-image-list',
  templateUrl: './image-list.component.html',
  styleUrls: ['./image-list.component.css'],
  animations: [
    trigger('slideDownUp', [
      transition(':enter', [style({ height: 0 }), animate(500)]),
      transition(':leave', [animate(500, style({ height: 0 }))]),
    ]),
  ],
})
export class ImageListComponent implements OnInit, OnDestroy {
  photos1: any;
  subscription: any;  
  my_select:number ;
  published: boolean;
  isShowing : boolean = false;
  filteredPhotos: any;
 
  filters = {}

  items = [];
  pageOfItems: Array<any>;

  photolist : any[]
  photolistbis : any[]
  photoDetailList : any[]
 rowIndexArray_item :any [];
  rowIndexArray_photo:any [];
  imageList1 : any[];
  imageList : any[];
rowIndexArray: any[] ;
imgDummy: string = '/assets/img/dummyimage.png';
monTableau : any[] ;
monTableauter : any[] ;
rowIndexArraybis: any[] ;
photos: Photo[];
photosSubscription: Subscription;

photolistter : any[]
rowIndexArray_phototer:any[];
photos_bis: any[] ;
photos_ter : any[];
currentPhoto = null;
currentIndex = -1;
tutoList : any[];

categoryList : any[];
rowIndexArray_Category:any [];


photoid : string ;


 constructor(private service: ImageService , private router: Router) { }
 new_caption : string ;
 
 myGroup = new FormGroup({
  new_caption: new FormControl()});
  my_email : string ;


  ngOnInit() {



    this.my_select = 0 ;
//
/**this.service.getAll().snapshotChanges().subscribe(
  list => { 
///this.photolistter = list.map(item => {return item.payload.val();}); // retourne une liste des catégory,caption,url
this.photolistter = list.map(item => {return item.payload.val();});   

this.monTableauter= list.map(item => {
     const data = item.payload.val();
    const key= item.payload.key;
    
  return data}); 

  }
)**/

firebase.auth().onAuthStateChanged(
  (user) =>{
    if(user) {
     
      this.my_email = user.email;
      
     
    // console.log( this.my_email );

    } else {
     
    }
  }
);

///



//

this.service.getAll().snapshotChanges().pipe(
  map(changes =>
    changes.map(c =>
      ({ key: c.payload.key, ...c.payload.val() })
    )
  )
//).subscribe(data => {
 // this.photos_bis = data

 ).subscribe(data => {



  //this.photos_bis = data

 

 
  this.photos_bis = data
 
  //this.items = this.photos_bis;
  //this.items = Array(150).fill(0).map((x, i) => ({ id: (i + 1), name: `Item ${i + 1}`}));
  //this.items = data.map((x, i) => ({ id: (x.key), name: `Photo ${x.caption}`}));
  this.items = this.photos_bis


  console.log ("this.items dans photo");
  console.log (this.items);
  console.log ("end this.items dans photo");  
   
this.categoryList=this.photos_bis.map(item => item.category)
.filter((value, index, self) => self.indexOf(value) === index)
/** 
console.log(this.photos_bis.map(item => item.category)
.filter((value, index, self) => self.indexOf(value) === index));

console.log ("this.photos_bis");
console.log (this.photos_bis); */
//this.rowIndexArray_Category = Array.from(Array(Math.ceil(this.categoryList.length / 3)).keys());
//this.rowIndexArray_Category = Array.from(Array(Math.ceil(this.categoryList.length / 3)).keys());
this.rowIndexArray_Category = Array.from(Array(Math.ceil(this.categoryList.length )).keys());
this.rowIndexArray_item = Array.from(Array(Math.ceil(this.items.length / 3)).keys());




//if (this.my_select = 1) 
//this.photos_bis = data.filter(e => e.category === 'Mauritius')
 




  
 



 

 // function findPhotos(photo) { 
   // return photo.published === false;
//}

//this.photos_bis.filter(findPhotos); 
//console.log("this.photos publiées");
//console.log(this.photos_bis.filter(findPhotos));
/* OR */
//console.log("this.photos_bis.filter(e => e.category === 'Mauritius')");
//console.log(this.photos_bis.filter(e => e.category === 'Mauritius'));


  //Lodash.filter(this.photos_bis, Lodash.conforms(this.published=true))
  this.rowIndexArray_phototer = Array.from(Array(Math.ceil(this.photos_bis.length / 3)).keys());
});

/** */

///
/**  this.service.getAll().snapshotChanges().pipe(
  map(changes =>
    changes.map(c =>
      ({ key: c.payload.key, ...c.payload.val() })
    )
  )
).subscribe(data => {
  this.photos_bis = data;
});

////*/ 

this.service.photoDetailList.snapshotChanges().subscribe(
  list => { 
this.photolistbis = list.map(item => {return item.payload.val();}); // retourne une liste des catégory,caption,url
  
this.monTableau= list.map(item => {
  const data = item.payload.val();
 const key= item.payload.key;
 
return key 
}); 



    this.rowIndexArraybis = Array.from(Array(Math.ceil(this.photolistbis.length / 3)).keys());
    
  
  }
)
//







//
    this.photosSubscription = this.service.photosSubject.subscribe(
      (photos: Photo[]) => {
        this.photos = photos ;
      }
      );
     
     
      this.photosSubscription = this.service.photosSubject.subscribe(
        list => { 
   this.photolist = list.map(item => {return item.category.toString();}); // retourne une liste des catégory,caption,url
      this.monTableau= list.map(item => {
           
          const key= item.category.toString;
          
        return key }); 
        
       
    
       
         this.rowIndexArray_photo = Array.from(Array(Math.ceil(this.photos.length / 3)).keys());
         
  
        }
      )



    this.service.getPhotos();
    this.service.emitPhotos();

////////////////////////////





///



 /**   this.service.imageDetailList.snapshotChanges().subscribe(
      list => { 
 this.imageList1 = list.map(item => {return item.payload.val();}); // retourne une liste des catégory,caption,url
       this.monTableau= list.map(item => {
         const data = item.payload.val();
        const key= item.payload.key;
        
      return key 
    }); 
      
 
      

      }
    )
*/ 

    


////////////////////////////////////////////////////////////////////////////////////////////

 /**    this.service.imageDetailList.snapshotChanges().subscribe(
      list => { 
 this.imageList = list.map(item => {return item.payload.val();}); // retourne une liste des catégory,caption,url
 
 this.monTableau= list.map(item => {
  const data = item.payload.val();
 const key= item.payload.key;
 
return key 
}); 


 
 this.rowIndexArray = Array.from(Array(Math.ceil(this.imageList.length / 3)).keys());
    
     
      }
    )
*/
  
  }
 // 
  
 
  



 //
  

  ///

  onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
}
  
  onNewPhoto () {
    this.router.navigate(['/image','photo']);
    
  }
  OnDeletePhoto(photo: Photo){
   
    this.service.removePhoto(photo);
  }
  
 

  callFunction(event, photos){

   

  }

  OnViewPhoto( id: number) {
   
   


    this.router.navigate(['/images', 'view', id]); 
  
    
    }


    OnViewCategory( my_category : string) {
   
   
     

      this.router.navigate(['/images', 'category', my_category]); 
    
      
      }





    ngOnDestroy() {
      this.photosSubscription.unsubscribe();
    }
 

  
}
