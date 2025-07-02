import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { Main } from './main/main';
import { FormsModule } from '@angular/forms';
import { Login } from './pages/login/login';
import {  AppComponent } from './app/app.component';
import {  HttpClientModule } from '@angular/common/http';
import { Organisateur } from './pages/organisateur/organisateur';
import { Participant } from './pages/participant/participant';
import { Admin } from './pages/admin/admin';
import { UsersList } from './pages/admin/users-list/users-list';
import { Dashboard } from './pages/admin/dashboard/dashboard';
import { UserEdit } from './pages/admin/user-edit/user-edit';
import { EventsList } from './pages/admin/events-list/events-list';
import { EventEdit } from './pages/admin/event-edit/event-edit';
import { RegistrationList } from './pages/admin/registration-list/registration-list';
import { RegistrationAdd } from './pages/admin/registration-add/registration-add';
import { SousCategorieAdd } from './pages/admin/sous-categorie-add/sous-categorie-add';
import { LocalAdd } from './pages/admin/local-add/local-add';
import { EventAdd } from './pages/admin/event-add/event-add';


@NgModule({
  declarations: [
    AppComponent,
    Login,
    Main,
    Organisateur,
    Participant,
    Admin,
    UsersList,
    Dashboard,
    UserEdit,
    EventsList,
    EventEdit,
    RegistrationList,
    RegistrationAdd,
    SousCategorieAdd,
    LocalAdd,
    EventAdd,
    
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
     FormsModule,
     HttpClientModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
