import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AngularFireModule } from "@angular/fire";
import { AngularFireStorageModule } from "@angular/fire/storage";
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ImagesComponent } from './images/images.component';
import { ImageComponent } from './images/image/image.component';
import { ImageListComponent } from './images/image-list/image-list.component';
import { environment } from "../environments/environment" ;
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MyFilterPipe } from './shared/MyFilterPipe';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { HeaderComponent } from './header/header.component';
import { AuthService } from './services/auth.service';
import { AuthGuardService } from './services/auth-guard.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { ImageService } from './shared/image.service';
import { PhotoComponent } from './images/photo/photo.component';
import { SinglephotoComponent } from './image/list/singlephoto/singlephoto.component';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { SinglecategoryComponent } from './image/list/singlecategory/singlecategory.component';
import { BackpackersHomeComponent } from './backpackers-home/backpackers-home.component';
import { HomeDescriptionComponent } from './home-description/home-description.component';
import { HomeComponent } from './backpackers-home/home/home.component';
import { JwPaginationComponent } from './home-description/Jw-pagination';
import { QuestionComponent } from './question/question.component';
import { QuestionService } from './shared/questions.service';

import { CommentaireService } from './shared/commentaires.service';
import { CommentaireComponent } from './commentaire/commentaire.component';
import { NestedFormComponent } from './nested-form/nested-form.component';
import { ReactiveComponent } from './reactive/reactive.component';
import { TestListComponent } from './test-list/test-list.component';
//import { JwPaginationComponent } from 'jw-angular-pagination';
//import { MatToolbarModule, MatSidenavModule, MatListModule, MatButtonModule, MatIconModule } from "@angular/material";

import { MatToolbarModule } from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';

import { FlexLayoutModule } from "@angular/flex-layout";
import { ReservationComponent } from './reservation/reservation.component';
import { ReservationService } from './services/reservation.service';

const appRoutes: Routes = [
  { path:'auth/signup', component: SignupComponent },
  { path:'auth/signin', component: SigninComponent },
  { path:'image/upload' ,canActivate:[AuthGuardService],component: ImageComponent },//route protégée par guard
  { path:'image/photo' ,canActivate:[AuthGuardService],component: PhotoComponent },
  { path:'image/list',canActivate:[AuthGuardService], component: ImageListComponent },
  { path:'images/view/:id',canActivate:[AuthGuardService], component: SinglephotoComponent },
  { path:'images/category/:my_category',canActivate:[AuthGuardService], component: SinglecategoryComponent },
  { path:'images/home',canActivate:[AuthGuardService], component: BackpackersHomeComponent },
  { path:'images/home_descripition',canActivate:[AuthGuardService], component: HomeDescriptionComponent },
  { path:'images/Question',canActivate:[AuthGuardService], component: QuestionComponent },
 
  { path:'images/Commentaire',canActivate:[AuthGuardService], component: CommentaireComponent },
  { path:'images/nested',canActivate:[AuthGuardService], component: NestedFormComponent },
  { path:'images/reactive',canActivate:[AuthGuardService], component: ReactiveComponent },
  { path:'images/test_list',canActivate:[AuthGuardService], component: TestListComponent },
  { path:'images/reservation',canActivate:[AuthGuardService], component: ReservationComponent },
  { path:'', redirectTo:'image/list',pathMatch:'full' },
  { path:'**', redirectTo:'image/list' },

]


@NgModule({
  declarations: [
    AppComponent,
    ImagesComponent,
    ImageComponent,
    ImageListComponent,MyFilterPipe, SignupComponent, SigninComponent, 
    HeaderComponent, 
     PhotoComponent, SinglephotoComponent, SinglecategoryComponent, BackpackersHomeComponent,
      HomeDescriptionComponent, HomeComponent,JwPaginationComponent, QuestionComponent,  CommentaireComponent, NestedFormComponent, ReactiveComponent, TestListComponent, ReservationComponent
     
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    //AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireModule.initializeApp(environment.firebaseConfig),
   
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    BrowserAnimationsModule,
    MatToolbarModule ,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    FlexLayoutModule

  ],
  providers: [AuthService,AuthGuardService,
    ImageService,QuestionService,CommentaireService,ReservationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
