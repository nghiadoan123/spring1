import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthGuard} from '../../helpers/auth.guard';
import {FloorsListComponent} from './floors-list/floors-list.component';
import {FloorsDeleteComponent} from './floors-delete/floors-delete.component';


const routes: Routes = [
  {
    path: 'list', component: FloorsListComponent
  },
  {
    path: 'delete', component: FloorsDeleteComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FloorRoutingModule { }
