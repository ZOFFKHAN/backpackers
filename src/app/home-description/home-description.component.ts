import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, interval, of, Subscription } from 'rxjs'
import {
  trigger,
  state,
  style,
  animate,
  transition,
  keyframes,
  query,
  stagger,
  group,
  animateChild,
  // ...
} from '@angular/animations';
import { zip, combineLatest,
  BehaviorSubject, Subject
} from 'rxjs';
import { withLatestFrom, take, first, map } from 'rxjs/operators';

import { switchMap, catchError } from 'rxjs/operators'
import { SlideflyInOutAnimation } from '../backpackers-home/animationmod';
import {
 
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import { Commentaire } from './commentaire';
import { AngularFireAction, AngularFireDatabase } from '@angular/fire/database';
import  firebase from 'firebase';
import { ImageService } from '../shared/image.service';
import { Photo } from 'src/app/models/Photo.model';
import { Router } from '@angular/router';




const images = [
  'assets/img/DSC00060.JPG',
  'assets/img/DSC00079.JPG',
  'assets/img/DSC00197.JPG',
  'assets/img/DSC00221.JPG'
  
];



/* 1. Define shirt color and logo options */
type Color = 'white' | 'green' | 'red' | 'blue';
type Logo = 'fish' | 'dog' | 'bird' | 'cow';










@Component({
  selector: 'app-home-description',
  
  templateUrl: './home-description.component.html',
  styleUrls: ['./home-description.component.scss'],
 // changeDetection: ChangeDetectionStrategy.OnPush,
 
 

 
 
 animations: [ trigger('enterExitLeft', [
  transition(':enter', [
    style({ opacity: 0, transform: 'translateX(-200px)' }),
    animate(
      '6000ms ease-in',
      style({ opacity: 1, transform: 'translateX(0)' })
    ),
  ]),
  transition(':leave', [
    animate(
      '6000ms ease-in',
      style({ opacity: 0, transform: 'translateX(-200px)' })
    ),
  ]),
]),

trigger('enterExitRight', [
  transition(':enter', [
    style({ opacity: 0, transform: 'translateX(200px)' }),
    animate(
      '6000ms ease-in',
      style({ opacity: 1, transform: 'translateX(0)' })
    ),
  ]),
  transition(':leave', [
    animate(
      '6000ms ease-in',
      style({ opacity: 0, transform: 'translateX(200px)' })
    ),
  ]),
]),

trigger('container', [
  transition(':enter, :leave', [
    query('@*', animateChild(), { optional: true }),
  ]),
]),

   
  trigger('Grow', [
    state('inactive', style({
      transform: 'scale(0.1)'
    })),
    state('active', style({
      transform: 'scale(1)'
    })),
    transition('inactive => active', animate('800ms ease-in')),
  ]),

  trigger('openClose',
   [ state('open', style({ height: '*', opacity: '1' })),
    state('closed', style({ height: '0px', opacity: '0' })),
     transition('open => closed', [ animate('0.5s') ]),
      transition('closed => open', [ animate('0.5s') ]), ]),

  
  trigger('flyInOutparallele', [
    state('in', style({
      width: 120,
      transform: 'translateX(0)', opacity: 1
    })),
    transition('void => *', [
      style({ width: 10, transform: 'translateX(50px)', opacity: 0 }),
      group ([
        animate('0.3s 0.1s ease', style({
          transform: 'translateX(0)',
          width: 120
        })),
        animate('0.3s ease', style({
          opacity: 1
        }))
      ])
    ]),
    transition('* => void', [
      group([
        animate('0.3s ease', style({
          transform: 'translateX(50px)',
          width: 10
        })),
        animate('0.3s 0.2s ease', style({
          opacity: 0
        }))
      ])
    ])
  ]),
   
   trigger('listAnimation', [
  transition('* <=> *', [
    query(':enter',
      [style({ opacity: 0 }), stagger('60ms', animate('600ms ease-out', style({ opacity: 1 })))],
      { optional: true }
    ),
    query(':leave',
      animate('200ms', style({ opacity: 0 })),
      { optional: true}
    )
  ])
]),

   trigger('flyInOut', [ 
      transition('void => *', [
        style({ opacity: 0}), 
        animate(20000, style({opacity: 1})),
        
      ]) 
    ]), 

    trigger('flyInOut1', [ 
      transition('void => *', [
        style({ opacity: 1 }), 
        animate(20000, style({opacity: 0})),
        
      ]) 
    ])
    ,
   
   // SlideflyInOutAnimation
/***
 trigger('flyInOut2', [
    state('in', style({ transform: 'translateX(0)' })),
    transition('void => *', [
      style({ transform: 'translateX(-100%)' }),
      animate(20000)
    ]),
    transition('* => void', [ style({ opacity: 1 }), 
      animate(20000, style({opacity: 0})),
      animate(20000, style({ transform: 'translateX(100%)' }))
    ])
  ]),  */

  trigger('flyInOut2', [
    state('in', style({ transform: 'translateX(0)' })),
    transition('void => *', [
      style({ transform: 'translateX(100%)' }),
      animate(20000),
      transition('* => void', [ 
        animate(20000, style({ transform: 'translateX(-100%)' }))
      ])
    ])
  ]),


   
  ]

})










export class HomeDescriptionComponent implements OnInit,OnDestroy  {

  items3$: Observable<AngularFireAction  <firebase.database.DataSnapshot>[]>;
  category$: BehaviorSubject<string|null>;
  imagesUrl : any[] ;
  photos_bis: any[] ;
  rowIndexArray_phototer:any[];


  photo: Photo;
  counterSubscription : Subscription;
  nbPhoto : number ;
  id : number;



  demo = {
    zip: [],
    combineLatest: [],
    withLatestFrom: [],
    forkJoin: []
  };

  get list() {
    return Object.keys(this.demo);
  }

  /* 2. Create the two persons - color and logo observables. */
  private color$ = new Subject<Color>();
  private logo$ = new Subject<Logo>();


 //isDisplayed : boolean = false;

 //isDisplayed : string = "hide";




 public buttonName:any = 'Anglais <==> Français';

langue : boolean = true;




show : boolean = false;
stateGrow : string = "inactive";

  images = [];

  toggleImages() {
    this.images = this.images.length ? [] : images;
  }



  
  animationState = 'in';

  constructor(db: AngularFireDatabase,private service: ImageService,private photosService: ImageService, private router: Router ) {

    const category$ = new Subject<string>();
    const queryObservable = category$.pipe(
      switchMap(category => 
        db.list('/photos', ref => ref.orderByChild('category').equalTo(category)).valueChanges()
      )
    );
    
    // subscribe to changes
    queryObservable.subscribe(queriedItems => {
      console.log("queriedItems"); 
      console.log(queriedItems);  


    });
    
    // trigger the query
   // category$.next('Other');
    
    // re-trigger the query!!!
   // category$.next('Mauritius');

    


   // this.category$ = new BehaviorSubject(null);
   this.category$ = new BehaviorSubject('Apartment');
    this.items3$ = this.category$.pipe(switchMap (category => 
      db.list('/photos', ref => 
      category ? ref.orderByChild('category').equalTo(category) : ref
  ).snapshotChanges()
    ));
    
   }



   filterBy(category: string|null) {
    this.category$.next('blank');
    this.category$.next(category); 

  }
  //filterBy(category: string|null) {
  //  this.category$.next(category); 
 // }
  













  newindex :number = 0;
  index: number = 0;
 // numImages: number = 4;
 numImages: number;
  imagesLoaded: number = 0;
  loading: boolean = true;
  

  arc: string = 'false';

  


  items = [];
    pageOfItems: Array<any>;

  /***    imagesUrl1000 = ["assets/img/DSC00060.JPG",
    "assets/img/DSC00079.JPG",
    "assets/img/DSC00197.JPG",
    "assets/img/DSC00221.JPG"] */


    items1 = [];

    toggleList() {
      this.items1 = this.items1.length ? [] : [0,1,2,3,4,5,6,7,8,9,10];
    }



    public slides = [
      {
        src: "/assets/img/DSC00060.JPG"
      },
      {
        src: "/assets/img/DSC00079.JPG"
      },
      {
        src: "/assets/img/DSC00221.JPG"
      }
  ];



/** 
imagesUrl = [

  "https://firebasestorage.googleapis.com/v0/b/backpacker-mauritius-c62f0.appspot.com/o/Mauritius%2FDSC00060_1610326814364?alt=media&token=35ad489a-c2ed-44b1-9213-1d6158babdf1"
 ,
 "https://firebasestorage.googleapis.com/v0/b/backpacker-mauritius-c62f0.appspot.com/o/Mauritius%2FDSC00013_1610326928902?alt=media&token=e3a94885-c786-43f7-b4c3-796e01bdc854"
 ,
 "https://firebasestorage.googleapis.com/v0/b/backpacker-mauritius-c62f0.appspot.com/o/Mauritius%2FDSC00207_1610327050791?alt=media&token=288a64a2-060e-4713-a7ed-0423fd3e83bd"
 ,"https://firebasestorage.googleapis.com/v0/b/backpacker-mauritius-c62f0.appspot.com/o/Mauritius%2FDSC00197_1610327092365?alt=media&token=bf63b062-7f9c-48fa-b2d8-529a8e8f838c"
 ]
*/




  ngOnInit() {


    this.photo = new Photo('','','','','');
    const id = 0;

const counter= interval(20000);

   this.aleainit();


   this.photosService.getSinglePhoto(id).then (
      (photo: Photo) => {this.photo = photo;} ); 

      this.counterSubscription = counter.subscribe(
        (value: number) => {
          this.getalea();
       }
       );













    this.service.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
  
     ).subscribe(data => {
     // this.photos_bis = data
     this.photos_bis = data.filter(e => e.category === 'Apartment');
      this.rowIndexArray_phototer = Array.from(Array(Math.ceil(this.photos_bis.length / 3)).keys());
    });


    this.service.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
  
     ).subscribe(data => {
     // this.photos_bis = data
    
      this.imagesUrl = data;
      this.numImages = this.imagesUrl.length + 1;
      this.imagesUrl.forEach((x, index) => {
        const image = new Image();
        image.onload = (() => {
          this.imagesLoaded++;
          this.loading = (this.imagesLoaded != this.numImages)
         
        })
        image.src = x
     /**   console.log ("x");
        console.log (x.imageUrl);
        console.log ("x.key");
        console.log (x.key);
        console.log("this_numImages");
        console.log(this.numImages); */ 
       
      })
      interval(20000).subscribe(() => {
        if (!this.loading)
        this.newindex =  this.index
        this.newindex = (this.newindex + 1) % this.numImages
        this.index = (this.index + 1) % this.numImages
       
      })

    });





  /* 3. We are ready to start printing shirt. 
    Need to subscribe to color and logo observables to produce shirts, we will write code here later */

    // 3.1 zip - love bird (you jump, i jump)
    zip(this.color$, this.logo$).subscribe(([color, logo]) => {
      this.demo.zip = [...this.demo.zip, { color, logo }];
      // console.log(`${color} shirt with ${logo}`);
    });




    // 3.2 combineLatest - go dutch (meet then wait for no man)
    combineLatest(this.color$, this.logo$).subscribe(([color, logo]) => {
      this.demo.combineLatest = [...this.demo.combineLatest, { color, logo }];
      // console.log(`${color} shirt with ${logo}`);
    });

    // 3.3 withLatestFrom - master slave (once get the slave, master take the lead)
    this.color$.pipe(
      withLatestFrom(this.logo$)
    ).subscribe(([color, logo]) => {
      this.demo.withLatestFrom = [...this.demo.withLatestFrom, { color, logo }];
       console.log(`${color} shirt with ${logo}`);
    });

    // 3.4 forkJoin - final destination (be serious, complete!)
    forkJoin(this.color$, this.logo$).subscribe(([color, logo]) => {
      this.demo.forkJoin = [...this.demo.forkJoin, { color, logo }];
      // console.log(`${color} shirt with ${logo}`);
    });

    // 3.5 forkJoin - final destination (take only the first color and logo)
     //const firstColor$ = this.color$.pipe(take(1));
     //const firstLogo$ = this.logo$.pipe(first());
     //forkJoin(firstColor$, firstLogo$).subscribe(([color, logo]) => {
      // this.demo.forkJoin = [...this.demo.forkJoin, { color, logo }];
     // console.log(`${color} shirt with ${logo}`);
    //});

    /* 4. The two persons(observables) are doing their job, picking color and logo */
    this.color$.next('white');
    this.logo$.next('fish');
    
    this.color$.next('green');
    this.logo$.next('dog');

    this.color$.next('red');
    this.logo$.next('bird');

    this.color$.next('blue');

    /* 5. When the two persons(observables) has no more info, they said bye bye */
    this.color$.complete();
    this.logo$.complete();    

    setTimeout (() => {
      this.stateGrow = "active";
   }, 10000);

   /** 
    let timer = Observable.timer (300);
    timer.subscribe(t=> {
      this.stateGrow = "active";
    });
*/

   // an example array of 150 items to be paged
   this.items = Array(150).fill(0).map((x, i) => ({ id: (i + 1), name: `Item ${i + 1}`}));

 

   








  }




  

  @Input() commentaires: Commentaire[];

  @Output() remove = new EventEmitter<number>();

  removeCommentaire(id: number) {
    this.remove.emit(id);
  }

  toggleShow() { this.show = !this.show; }
 // isDisplayedShow() { this.show = !this.show; }

 isDisplayed = true;

 toggleIsDisplayed(): void {
   this.isDisplayed = !this.isDisplayed;
 }


  toggleShowDiv(divName: string) {
    if (divName === 'divA') {
      console.log(this.animationState);
      this.animationState = this.animationState === 'out' ? 'in' : 'out';
      console.log(this.animationState);
    }
  }

  onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
}


OnViewPhoto( id: number) {
   
   


  this.router.navigate(['/images', 'view', id]); 

  
  }



 toggle_hide_show() {
    this.langue= !this.langue;

    // CHANGE THE NAME OF THE BUTTON.
    if(this.langue)  
     this.buttonName = "Anglais <==> Français";
    
      
    else
      this.buttonName = "French <==> English";
  }

  scrollIntoView(anchorHash) {
    setTimeout(() => {
        const anchor = document.getElementById(anchorHash);
        if (anchor) {
            anchor.focus();
            anchor.scrollIntoView();
        }
    });
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
    //this.photosService.getSinglePhoto(this.entierAleatoire(0,15)).then (
      this.photosService.getSinglePhoto(this.entierAleatoire(0,this.numImages-2)).then (
     (photo: Photo) => {this.photo = photo;} 
   
     ); 
     console.log("this.numImages");
     console.log(this.numImages);
  }
  
  

  
  
  ngOnDestroy() {
   
    this.counterSubscription.unsubscribe();
  
  }

















  }


