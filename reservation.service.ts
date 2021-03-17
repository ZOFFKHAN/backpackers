import { Subject } from 'rxjs';

export class ReservationService {

    ReservationSubject =new Subject<any[]>();
	/* création d'un tableau avec les objets et statut*/

	private Reservations = [
        { id: 1 , name : ' place-1', status : 'réservé'},
        { id: 2 , name : ' place-2', status : 'libre'},
        { id: 3 , name : ' place-3', status : 'libre'},
        { id: 4 , name : ' place-4', status : 'libre'},
        { id: 5 , name : ' place-5', status : 'réservé'},
        { id: 6 , name : ' place-6', status : 'réservé'},
        { id: 7 , name : ' place-7', status : 'libre'},
        { id: 8 , name : ' place-8', status : 'réservé'},
        { id: 9 , name : ' place-9', status : 'réservé'},
        { id: 10 , name : ' place-10', status : 'libre'},
        { id: 11 , name : ' place-11', status : 'libre'},
        { id: 12 , name : ' place-12', status : 'libre'},
        { id: 13 , name : ' place-13', status : 'réservé'},
        { id: 14 , name : ' place-14', status : 'réservé'},
        { id: 15 , name : ' place-15', status : 'libre'},
        { id: 16 , name : ' place-16', status : 'réservé'},
        { id: 17 , name : ' place-17', status : 'libre'},
        { id: 18 , name : ' place-18', status : 'libre'},
        { id: 19 , name : ' place-19', status : 'réservé'},
        { id: 20 , name : ' place-20', status : 'réservé'},
        { id: 21 , name : ' place-21', status : 'réservé'},
        { id: 22 , name : ' place-22', status : 'réservé'},
        { id: 23 , name : ' place-23', status : 'libre'},
        { id: 24 , name : ' place-24', status : 'libre'},
        { id: 25 , name : ' place-25', status : 'libre'},
        { id: 26 , name : ' place-26', status : 'réservé'},
        { id: 27 , name : ' place-27', status : 'réservé'},
        { id: 28 , name : ' place-28', status : 'réservé'},
        { id: 29 , name : ' place-29', status : 'libre'},
        { id: 30 , name : ' place-30', status : 'libre'},
        { id: 31 , name : ' place-31', status : 'réservé'},
        { id: 32 , name : ' place-32', status : 'réservé'},
        { id: 33 , name : ' place-33', status : 'réservé'},
        { id: 34 , name : ' place-34', status : 'libre'},
        { id: 35 , name : ' place-35', status : 'libre'},
        { id: 36 , name : ' place-36', status : 'réservé'},
        { id: 37 , name : ' place-37', status : 'réservé'},
        { id: 38 , name : ' place-38', status : 'réservé'},
        { id: 39 , name : ' place-39', status : 'libre'},
        { id: 40 , name : ' place-40', status : 'libre'},
        { id: 41 , name : ' place-41', status : 'libre'},
        { id: 42 , name : ' place-42', status : 'réservé'},
        { id: 43 , name : ' place-43', status : 'libre'},
        { id: 44 , name : ' place-44', status : 'réservé'},
        { id: 45 , name : ' place-45', status : 'réservé'},
        { id: 46 , name : ' place-46', status : 'libre'},
        { id: 47 , name : ' place-47', status : 'réservé'},
        { id: 48 , name : ' place-48', status : 'libre'},
        { id: 49 , name : ' place-49', status : 'réservé'},
        { id: 50 , name : ' place-50', status : 'libre'},
        { id: 51 , name : ' place-51', status : 'libre'},
        { id: 52 , name : ' place-52', status : 'libre'},
        { id: 53 , name : ' place-53', status : 'réservé'},
        { id: 54 , name : ' place-54', status : 'réservé'},
        { id: 55 , name : ' place-55', status : 'libre'},
        { id: 56 , name : ' place-56', status : 'réservé'},
        { id: 57 , name : ' place-57', status : 'libre'},
        { id: 58 , name : ' place-58', status : 'réservé'},
        { id: 59 , name : ' place-59', status : 'réservé'},
        { id: 60 , name : ' place-60', status : 'réservé'},
        { id: 61 , name : ' place-61', status : 'réservé'},
        { id: 62 , name : ' place-62', status : 'réservé'},
        { id: 63 , name : ' place-63', status : 'réservé'},
        { id: 64 , name : ' place-64', status : 'réservé'},
        { id: 65 , name : ' place-65', status : 'réservé'},
        { id: 66 , name : ' place-66', status : 'libre'},
        { id: 67 , name : ' place-67', status : 'réservé'},
        { id: 68 , name : ' place-68', status : 'libre'},
        { id: 69 , name : ' place-69', status : 'libre'},
        { id: 70 , name : ' place-70', status : 'réservé'},
        { id: 71 , name : ' place-71', status : 'réservé'},
        { id: 72 , name : ' place-72', status : 'libre'}
       
];


emitReservationSubject() {
this.ReservationSubject.next(this.Reservations.slice());
}


getReservationById(id: number) {
	const Reservation = this.Reservations.find(
		  (ReservationObject) => {
return ReservationObject.id === id;
		}
		);
		return Reservation;
	
}
	
/** ajout de méthodes**/
/**le fait de rendre private empêche l'access aux fonctions */

switchOnAll(){
	for (let Reservation of this.Reservations) {
		Reservation.status ='réservé'
	}
	this.emitReservationSubject();
}

/*** donc on est obligé de faire emmettre le subject */
switchOffAll(){
	for (let Reservation of this.Reservations) {
		Reservation.status ='libre'
	}
	this.emitReservationSubject();
}
switchOnOne(index: number){
    console.log("switchOnOne-index");
    console.log(index);
    // this.Reservations[index].status='réservé';
    this.Reservations[index-1].status='réservé';
	this.emitReservationSubject();
}
switchOffOne(index: number){
	this.Reservations[index].status='libre';
	this.emitReservationSubject();
}
addReservation(name: string, status: string){
	const ReservationObject = {
		id: 0,
		name: '',
		status: ''
	};
ReservationObject.name = name;
ReservationObject.status = status;
ReservationObject.id = this.Reservations[(this.Reservations.length-1)].id + 1;
/***démarre à zéro donc length -1 */


this.Reservations.push(ReservationObject);
this.emitReservationSubject();
}
    

}
