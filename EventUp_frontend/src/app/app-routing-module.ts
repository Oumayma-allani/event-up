import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Main } from './main/main';
import { Login } from './pages/login/login';
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
import { EventAdd } from './pages/admin/event-add/event-add';
const routes: Routes = [
  {
    path: 'login',
    component: Login 
  },

  {

  path: 'organisateur',
  component:Organisateur

  },

  {

  path: 'participant',
  component:Participant

  },
  {

  path: 'admin',
  component:Admin,
  children: [
        { path: '', component: Dashboard }, 

        { path: 'users', component: UsersList},

        {path :'users/edit/:id',component:UserEdit},

        { path: 'events', component: EventsList},

        {path:'events/edit/:id',component:EventEdit},
        
        {path: 'events/add',component:EventAdd},

        {path : 'registrations', component:RegistrationList },
        {path:'registrations/add',component:RegistrationAdd}

    ]

  },
  
  {
    path: 'eventup',
    component:Main,
  },
{
    path: '',
    component: Main,
    children: [
        //{ path: 'home', component: Main }

    ]
  },
  
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
