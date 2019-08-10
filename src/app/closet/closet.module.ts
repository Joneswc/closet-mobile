import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClosetRoutingModule } from './closet-routing.module';
import { ClosetListComponent } from './component/closet-list/closet-list.component';
import { ClothesDetailComponent } from './component/clothes-detail/clothes-detail.component';
import { ClothesComponent } from './containers/clothes/clothes.component';
import { ClosetComponent } from './containers/closet/closet.component';
import {SharedModule} from '../core/shared/shared.module';
import {clothesReducer} from './store/reducers/feature.reducer';
import {StoreModule} from '@ngrx/store';
import {ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material';


@NgModule({
  declarations: [ClosetListComponent, ClothesDetailComponent, ClothesComponent, ClosetComponent],
  exports: [
    ClosetListComponent,
    ClothesDetailComponent,
    SharedModule
  ],
  imports: [
    CommonModule,
    ClosetRoutingModule,
    SharedModule,
    StoreModule.forFeature('clothes', clothesReducer)
  ]
})
export class ClosetModule { }
