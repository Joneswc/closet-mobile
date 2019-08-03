import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ClosetComponent} from './containers/closet/closet.component';
import {ClothesComponent} from './containers/clothes/clothes.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'closet' },
  { path: 'closet', component: ClosetComponent },
  { path: 'detail', component: ClothesComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClosetRoutingModule { }
