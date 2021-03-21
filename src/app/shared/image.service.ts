import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

import { Subject } from 'rxjs';
import { Photo} from '../models/Photo.model'
import firebase from 'firebase/app';




@Injectable({
  providedIn: 'root'
})
export class ImageService {

  
  private firePath = '/photos';


  photos: Photo[] = [];
  photosSubject = new Subject <Photo[]>();
 
  photoDetailList : AngularFireList<Photo> = null;
 
  
  imageDetailList1 :AngularFireList<Photo[]>;
  
  imageDetailList: AngularFireList<any>;

  caption : string ;
  category :string ;

  constructor(private firebase: AngularFireDatabase ) { this. photoDetailList = firebase.list(this.firePath);}
 
  emitPhotos() {
    this.photosSubject .next(this.photos)
 }
 savePhotos() {
  /** insere les books avec set dans le répertoire /books */
      firebase.database().ref('/photos').set(this.photos);    
    }


 getPhotos() {
  firebase.database().ref('/photos')
  .on('value', (data) => {
    /****si les books sont vides renvoyer un array vide */
    //avec .on
    this.photos = data.val() ? data.val() : [];
    this.emitPhotos();
 
  });
}  

getSinglePhoto(id: number) {//méthode asyncrone
  return new Promise(
    (resolve, reject) => {
    firebase.database().ref('/photos/' + id).once('value') .then(//.once à la place de .on
      (data) => {
        resolve(data.val());
      },(error) => {
        reject(error);
      }
    );
    }
  );
}

update(key: string, value: any): Promise<void> {
  
  return this.photoDetailList.update(key, value);
  
}






//


getAll(): AngularFireList<Photo> {
  return this.photoDetailList;
}

create(photo: Photo): any {
  return this.photoDetailList.push(photo);
  
}

//

//






delete(key: string): Promise<void> {
  return this.photoDetailList.remove(key);
}

deleteAll(): Promise<void> {
  return this.photoDetailList.remove();
}




//



/**var johnRef = firebase.database().ref("players/John");

johnRef.update ({
   "number": 10
});**/


updateComphoto(id,category_bis,caption_bis ) {
  firebase.database().ref("photos/" + id).set({
    caption: caption_bis,
    category: category_bis
    
  });
 

}


//



//

createNewPhoto(newPhoto: Photo) {

  /**ajout du livre par push, save,emit */
  this.photos.push(newPhoto);
  this.savePhotos();
  this.emitPhotos();
}

removePhoto(photo: Photo) {
  /**supprime l'image associée au livre également */
  if(photo.imageUrl){
   const storageRef = firebase.storage().refFromURL(photo.imageUrl);
   storageRef.delete().then(
     () => {
       console.log('photo supprimée !');
     }
   ) .catch (
     (error) => {
       console.log('fichier non trouvé: ' + error );
     }
   );
  }
  const photoIndexToRemove = this.photos.findIndex(
    (photoEL) => {
      if(photoEL === photo ) {
        return true;
      }
    }
  );
this.photos.splice(photoIndexToRemove,1);
this.savePhotos();
this.emitPhotos();
}

uploadFile_photo(file: File) {
  return new Promise(
    (resolve,reject) => {
      const almostUniqueFileName = Date.now().toString();
      const upload = firebase.storage().ref()
      .child( 'images_photos/' + almostUniqueFileName + file.name)
      .put(file);
      upload.on(firebase.storage.TaskEvent.STATE_CHANGED,
        () => {
          console.log('chargement...');
          upload.snapshot.ref.getDownloadURL().then(function(downloadURL) {
            console.log('File available at', downloadURL);
          });
        },
        (error) => {
          console.log('erreur de chargement : ' + error);
          reject () ;
        },
        () => {
         /**  resolve(upload.snapshot.downloadURL);**/
         /**  resolve(upload.snapshot.ref.getDownloadURL());**/
          {
            upload.snapshot.ref.getDownloadURL().then(
              (downloadUrl) => {
                console.log('Upload successful! ('+downloadUrl+')');
                resolve(downloadUrl);
              }
            );
          }





        }
        );

    }

  );
}






getphotoDetailList(){
  this.photoDetailList = this.firebase.list('photos');
  
  
  }



getImageDetailList1(){
  this.imageDetailList1 = this.firebase.list('photos');
  
 
  }

 getImageDetailList(){
this.imageDetailList = this.firebase.list('imageDetails');


}

  insertImageDetails(imageDetails){
    this.imageDetailList.push(imageDetails);



    
   
  }

  
}
