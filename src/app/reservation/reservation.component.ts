import { Component,Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { FindValueSubscriber } from 'rxjs/internal/operators/find';
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
status : string = 'false'
  isSubmitted : boolean ;
  resaForm: FormGroup;
  place_libre : number ;
  bookerror : string = 'true';

  my_plan : string = 'false';
compteur :number = 0;


  my_flag : boolean = false;
headers =['sièges',1,2,3,4,5,6,7,8,9]
title = 'Réservation';
 
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

constructor(private reservationService: ReservationService,private formBuilder: FormBuilder ) { }

ngOnInit(){
  
this.initForm ();
/** 
this.reservationSubscription = this.reservationService.ReservationSubject.subscribe(
  (reservations: any[])  => {
    this.reservations = reservations;
    this.rowIndexArray = Array.from(Array(Math.ceil(this.reservations.length  / 9)).keys());
  }   
  );
  this.reservationService.emitReservationSubject(); */
     
  } 

initForm (){
    this.resaForm=this.formBuilder.group({
    new_row: [''],
    new_order: [''],
    place_libre : [''],
    bookerror : [''],
    my_plan : ['false']

    });
  }

  onSaveResa(status,my_plan) {//bouton 'Vérifier la disponibilité'
  
  
  this.isSubmitted = true;
  
  const new_row = this.resaForm.get('new_row').value;
  const new_order = this.resaForm.get('new_order').value;
  const debut_row = ((new_row - 1 ) * 9) + 1 ;
  const fin_row = ((new_row - 1 ) * 9) + 9 ;

  /**rangée : new_row = 5
  nb_places: new_order = N
  debut_row = ((new_row - 1 ) * 9) + 1 ; ((5 - 1 ) * 9) + 1 = 37
  fin_row = ((new_row - 1 ) * 9) + 9 ; ((5 - 1 ) * 9) + 9 = 45
  
  **/


  this.OnResa(debut_row,fin_row,new_order,status,my_plan);
    }

  OnResa (debut_row,fin_row,new_order,status,my_plan) {
    
  this.reservationSubscription = this.reservationService.ReservationSubject.subscribe(
    (reservations: any[])  => {
      
     
     this.reservations = reservations.filter(e => e.status === 'libre' &&  e.id >= debut_row &&  e.id <= fin_row  );
     
     //parcours la table réservations et filtre sur la tranche [37-45] && 'libre'
this.place_libre = this.reservations.length;

//place_libre = Nb_place libre


this.my_plan = my_plan
this.my_flag = status


if (new_order > this.place_libre) {
  this.bookerror = 'true' ;
  
} else if (new_order <= this.place_libre && (new_order > 0)) {
  
  this.bookerror = 'false' ;
  this.my_flag = true;
  new_order = new_order-1
  this.compteur = this.compteur + 1
  console.log("-----")
  console.log("this.compteur")
  console.log(this.compteur)
  console.log("new_orderinitialisation");
  console.log(new_order);
  console.log("place libre initialisation");

  console.log(this.place_libre);
  console.log("-----")
}else if (this.my_flag && (new_order == 0)){
  this.my_flag = false;
  this.bookerror = 'true' ;
  console.log("this.my_flag ==0 ");
  console.log(this.my_flag);
 
console.log("new_orderinitialisation ==0 ");
  console.log(new_order);

} else if (new_order == 0){
  this.my_flag = false;
  this.bookerror = 'false' ;

} 



  /**-- 
  affiche les places disponibles 
  active tous les boutons de booking **/

  /**bug 
   si new_order = 5
   place_libre = 6
   
   1er booking => place_libre = 5
   2ème booking => place_libre = 4

   affiche les places disponibles 
      désactive tous les boutons de booking
   */

   /**
    solution :
    compteur de booking qui se décrémente à chaque booking
et qui doit s'arrêter quand le compteur arrive à zéro CAD : nombre de places souhaité a été réservé !
    */

    /**
     message apparaît 'stop' mais les sièges restantes ne sont pas revérouillées :-( magré le changement de flag
     */



/** 


/** génère un message d'erreur, this.bookerror = 'true' ; 
-- affiche le nb place dispo pour la rangée
-- 
     affiche les places disponibles 
     désactive tous les boutons de booking
**/


     this.rowIndexArray = Array.from(Array(Math.ceil(this.reservations.length  / 9)).keys());
    }   
    );
   // new_order = new_order ;
   
    this.reservationService.emitReservationSubject();
  
}

OnRAZ () {

  this.resaForm.setValue({
    new_row:'1',
    new_order:'100',
    bookerror:'',
    place_libre :'',
    my_plan : 'true'

  });
this.status ='false'
this. my_plan = 'true'

this.OnReinitForms();
}




OnRAZ1 () {

  this.resaForm.setValue({
    new_row:'1',
    new_order:'1',
    bookerror:'',
    place_libre :'',
    my_plan :'true'
    
  });
  this.status ='false'
  this.my_plan = 'true'
this.OnReinitForms();
  
}

OnReinitForms()
{

  this.onSaveResa(status,this.my_plan);
  this.reservationSubscription = this.reservationService.ReservationSubject.subscribe(
    (reservations: any[])  => {
      this.reservations = reservations;
     

      this.rowIndexArray = Array.from(Array(Math.ceil(this.reservations.length  / 9)).keys());
    }   
    );
   
    this.reservationService.emitReservationSubject();

    this.resaForm.setValue({
      new_row:'',
      new_order:'',
      bookerror:'',
      place_libre :'',
      my_plan :'true'
     
    });
    this.my_plan = 'true'
}




onBookSeat(id){

  this.reservationService.bookOnOne(id);
  
}


onFreeSeat(id){
 
  this.reservationService.freeOnOne(id);
}



onBook(){
this.reservationService.bookAll();
}

onFree(){
this.reservationService.freeAll();
}

}
