import { Component, OnDestroy, OnInit,DoCheck } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Key } from 'protractor';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Photo } from 'src/app/models/Photo.model';
import { ImageService } from 'src/app/shared/image.service';

import { FormControl, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-singlecategory',
  templateUrl: './singlecategory.component.html',
  styleUrls: ['./singlecategory.component.scss']
})
export class SinglecategoryComponent implements OnInit {

  constructor(private route: ActivatedRoute ,private service: ImageService , private router: Router) { }
  my_select:number ;
  photos_bis: any[] ;
  new_caption : string ;
  categoryList : any[];
  rowIndexArray_Category:any [];
  rowIndexArray_phototer:any[];
  imgDummy: string = '/assets/img/dummyimage.png';
  my_category : string;
  ngOnInit() {

    this.my_select = 1 ;

  
    
    this.my_category = this.route.snapshot.params['my_category'];

   // this.my_category = 'Mauritius'
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
    
     
    
      switch (this.my_select) {
        case 0:
            console.log("It is a Sunday.");
            this.photos_bis = data
            break;
        case 1:
            console.log("It is a Monday.");
            //this.photos_bis = data.filter(e => e.category === 'Bird')
            
            
            this.photos_bis = data.filter(e => e.category === this.my_category)
         // this.photos_bis = data.filter(e => e.author === 'unknown')
            console.log("this.photos_bis");

           
            break;
        case 2:
          this.photos_bis = data.filter(e => e.author === "V.visitor@visitor.com")
          
            break;
        case 3:
            console.log("It is a Wednesday.");
            break;
        case 4:
            console.log("It is a Thursday.");
            break;
        case 5:
            console.log("It is a Friday.");
            break;
        case 6:
            console.log("It is a Saturday.");
            break;
        default:
            console.log("No such day exists!");
            break;
    }
     
      
          
       
    this.categoryList=this.photos_bis.map(item => item.category)
    .filter((value, index, self) => self.indexOf(value) === index)
    
    console.log(this.photos_bis.map(item => item.category)
    .filter((value, index, self) => self.indexOf(value) === index));
    
    this.rowIndexArray_Category = Array.from(Array(Math.ceil(this.categoryList.length / 3)).keys());
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

  }

  OnViewPhoto( id: number) {
   this.router.navigate(['/images', 'view', id]); 
  }











}
