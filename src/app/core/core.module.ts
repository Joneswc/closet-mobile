import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from './core-routing.module';
import { SharedModule } from './shared/shared.module';
import { LayoutComponent } from './containers/layout/layout.component';
import { HomeComponent } from './containers/home/home.component';
import {EffectsModule} from '@ngrx/effects';
import {CoreEffects} from './store/effects/core.effects';
import { AddclothesComponent } from './containers/addclothes/addclothes.component';
import { LoginComponent } from './containers/login/login.component';
import {AuthGuard} from './guards/auth.guard';
import {StoreModule} from '@ngrx/store';
import {reducers} from './store/reducers/feature.reducers';
import {AuthEffets} from './store/effects/auth.effets';

@NgModule({
  declarations: [LayoutComponent, HomeComponent, AddclothesComponent, LoginComponent],
  imports: [
    CommonModule,
    CoreRoutingModule,
    SharedModule,
    EffectsModule.forFeature([CoreEffects, AuthEffets]),
    StoreModule.forFeature('core', reducers)
  ],
  providers: [AuthGuard]
})
export class CoreModule { }
