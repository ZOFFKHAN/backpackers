import { Component, OnInit } from '@angular/core';
import { SlideInOutAnimation } from './animation';
import { ChangeDetectionStrategy, Input } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations'
import { interval } from 'rxjs';



@Component({
  selector: 'app-backpackers-home',
  templateUrl: './backpackers-home.component.html',
  styleUrls: ['./backpackers-home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  //animations : [SlideInOutAnimation],
 animations : [
 /**  trigger('flyInOut', [
    state('in', style({ transform: 'translateX(0)' })),
    transition('void => *', [
      style({ transform: 'translateX(-100%)' }),
      animate(200)
    ]),
    transition('* => void', [
      animate(200, style({ transform: 'translateX(100%)' }))
    ])
  ]),**/
  //
  SlideInOutAnimation,
  //
  trigger('slidingPictures',[
  state('game1',style({
    background:"url(../assets/images/game1.jpg)"
  })),
  state('game2',style({
    background:"url(../assets/images/game2.png)"
  })),
  state('game3',style({
    background:"url(../assets/images/game3.jpg)"
  })),
  transition('game1=>game2',[
    animate('1s',
    style (
      {
        transform: 'translateX(-100%)',

      }
      ))
  ]),
  transition('game2=>game3',[
    animate('1s',style({
      transform: 'translateX(-100%)',

    }))
  ]),
  transition('game3=>game1',[
    animate('1s',style({transform: 'translateX(-100%)'}))
  ])

]),],
  

  
})
export class BackpackersHomeComponent implements OnInit {
 //

 game:string;
 gameIndex:number;
 games:string[];

 index: number = 0;
  numImages: number = 4;
  imagesLoaded: number = 0;
  loading: boolean = true;
  
  /**imagesUrl = [
    "https://picsum.photos/id/402/2500/1667",
    "https://picsum.photos/id/301/2500/1667",
    "https://picsum.photos/id/302/2500/1667",
    "https://picsum.photos/id/400/2500/1667"]**/

   /** imagesUrl = ["assets/img/DSC00060.JPG",
    "assets/img/DSC00079.JPG",
    "assets/img/DSC00197.JPG",
    "assets/img/DSC00221.JPG"]
*/ 

imagesUrl = [

 "https://firebasestorage.googleapis.com/v0/b/backpacker-mauritius-c62f0.appspot.com/o/Mauritius%2FDSC00060_1610326814364?alt=media&token=35ad489a-c2ed-44b1-9213-1d6158babdf1"
,
"https://firebasestorage.googleapis.com/v0/b/backpacker-mauritius-c62f0.appspot.com/o/Mauritius%2FDSC00013_1610326928902?alt=media&token=e3a94885-c786-43f7-b4c3-796e01bdc854"
,
"https://firebasestorage.googleapis.com/v0/b/backpacker-mauritius-c62f0.appspot.com/o/Mauritius%2FDSC00207_1610327050791?alt=media&token=288a64a2-060e-4713-a7ed-0423fd3e83bd"
,"https://firebasestorage.googleapis.com/v0/b/backpacker-mauritius-c62f0.appspot.com/o/Mauritius%2FDSC00197_1610327092365?alt=media&token=bf63b062-7f9c-48fa-b2d8-529a8e8f838c"
]












 //

  animationState = 'in';
  constructor() { 
    //
   /**this.gameIndex = 0;

    this.games = ['game1','game2','game3'];
    this.game = this.games[this.gameIndex];

    setInterval(() => this.rotatingBackground(), 10000);

 */ 

    
    //
  }

  ngOnInit() {


//preload the images
/**this.imagesUrl.forEach((x, index) => {
  const image = new Image();
  image.onload = (() => {
    this.imagesLoaded++;
    this.loading = (this.imagesLoaded != this.numImages)
  })
  image.src = x
  console.log("image.src");
  console.log(image.src);

})
interval(2000).subscribe(() => {
  if (!this.loading)
     this.index = (this.index + 1) % this.numImages
})**/

  }


//
/** 
rotatingBackground():any {
  console.log(this.gameIndex);
  this.game = this.games[this.gameIndex];
  this.gameIndex++;
  if(this.gameIndex >= this.games.length) {
    this.gameIndex = 0;
  }
  console.log("this.game");
  console.log(this.game);
}**/
//





  toggleShowDiv(divName: string) {
    if (divName === 'divA') {
      console.log(this.animationState);
      this.animationState = this.animationState === 'out' ? 'in' : 'out';
      console.log(this.animationState);
    }
  }
}

///

