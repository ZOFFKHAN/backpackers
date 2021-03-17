import { Component,Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ReservationService } from '../services/reservation.service';


@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss']
})
export class ReservationComponent implements OnInit {
  new_order : number ;
  new_row : number ;
  rowIndexArray :any [];

  isSubmitted : boolean ;
  resaForm: FormGroup;
  place_libre : number ;
  bookerror : string = 'true';
  @Input() resaName : string ;
  /*appareilStatus ="éteint";*/
  @Input() resaStatus : string ;
   @Input() indexOfResa : number ; 
    @Input() id: number ;







headers =['sièges',1,2,3,4,5,6,7,8,9]


 
  title = 'my_awesome_app';
  
  isAuth = false;
  
  /* utilisation de pipes **/
  /**lastUpdate = new Date();**/
  /** rendre la date asynchrone**/
  
  lastUpdate = new Promise (
  (resolve, reject)=> {const date = new Date();
  setTimeout(
	() =>{
		  resolve(date);
	  }, 2000
  );
}
)
  
reservations: any[];
  reservationSubscription: Subscription;


  constructor(private reservationService: ReservationService,private formBuilder: FormBuilder ) { 
    setTimeout(
      () => {
        this.isAuth = true;
      }, 4000
    );
   }

  ngOnInit(){
    /**this.reservations = this.reservationService.reservations; **/

   this.initForm ();

this.reservationSubscription = this.reservationService.ReservationSubject.subscribe(
  (reservations: any[])  => {
    this.reservations = reservations;
    this.rowIndexArray = Array.from(Array(Math.ceil(this.reservations.length  / 9)).keys());
  
  
  }   
  );
  this.reservationService.emitReservationSubject();  
  }


 

  initForm (){
    this.resaForm=this.formBuilder.group({
      new_row: [''],
      new_order: [''],
     place_libre : [''],
     bookerror : ['']
    // caption : ['',[Validators.required,Validators.maxLength(14)]],
      //questionid: ['',Validators.required]
     

    });
  }

  onSaveResa() {
    this.isSubmitted = true;
   
  
    const new_row = this.resaForm.get('new_row').value;
  const new_order = this.resaForm.get('new_order').value;
const debut_row = ((new_row - 1 ) * 9) + 1 ;
const fin_row = ((new_row - 1 ) * 9) + 9 ;

  this.OnResa(debut_row,fin_row,new_order);
    }


OnResa (debut_row,fin_row,new_order) {

  this.reservationSubscription = this.reservationService.ReservationSubject.subscribe(
    (reservations: any[])  => {
      //this.reservations = reservations;
      this.reservations = reservations.filter(e => e.status === 'libre' &&  e.id > debut_row - 1 &&  e.id <= fin_row  );
this.place_libre = this.reservations.length;


if (new_order > this.place_libre) {
   this.bookerror = 'true' ;
   console.log("this.bookerror");
   console.log(this.bookerror);
}

if (new_order <= this.place_libre) {
  this.bookerror = 'false' ;
  console.log("this.bookerror");
  console.log(this.bookerror);
}


     // this.rowIndexArray = Array.from(Array(Math.ceil(this.reservations.length  / 9)).keys());
    }   
    );
    this.resetForm();
    this.reservationService.emitReservationSubject();
  
}

OnRAZ () {

 
 
this.onSaveResa();

  this.reservationSubscription = this.reservationService.ReservationSubject.subscribe(
    (reservations: any[])  => {
      this.reservations = reservations;
     

      this.rowIndexArray = Array.from(Array(Math.ceil(this.reservations.length  / 9)).keys());
    }   
    );
   
    this.reservationService.emitReservationSubject();
  
}

OnRAZ1 () {

    this.reservationSubscription = this.reservationService.ReservationSubject.subscribe(
      (reservations: any[])  => {
        this.reservations = reservations;
       
  
        this.rowIndexArray = Array.from(Array(Math.ceil(this.reservations.length  / 9)).keys());
      }   
      );
     
      this.reservationService.emitReservationSubject();
    
  }



resetForm(){
  this.resaForm.setValue({
    new_row:'',
    new_order:'100',
    bookerror:'true',
    place_libre :''
  });
}



onSwitchOn(id){
  console.log("switchOnOne");
  console.log(id);
  this.reservationService.switchOnOne(id);
}
 onSwitchOff(id){
  console.log("switchOffOne");
  console.log(id);
  this.reservationService.switchOffOne(id);
}








































  onAllumer(){
    console.log('on réserve tout');
this.reservationService.switchOnAll();
}

onEteindre(){
    console.log('on libère tout');
this.reservationService.switchOffAll();
}

}
