import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ImageListComponent } from './images/image-list/image-list.component';
import { ImageComponent } from './images/image/image.component';
import { ImagesComponent } from './images/images.component';

const routes: Routes = [
 /**  { path:'', redirectTo:'image/photo', pathMatch :'full'},
  { path :'image', component : ImagesComponent, children :[
    { path :'photo', component : ImageComponent},
    { path :'list', component : ImageListComponent},
  ]  }**/
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
