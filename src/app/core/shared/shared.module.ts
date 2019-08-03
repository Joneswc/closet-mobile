import { NgModule } from '@angular/core';
import {FlexLayoutModule} from '@angular/flex-layout';
import { MaterialModule } from './material/material.module';



@NgModule({
  declarations: [],
  imports: [
    FlexLayoutModule,
    MaterialModule
  ],
  exports: [
    FlexLayoutModule,
    MaterialModule
  ]
})
export class SharedModule { }
