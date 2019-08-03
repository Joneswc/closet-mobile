import { NgModule } from '@angular/core';
import {MatButtonModule, MatCardModule, MatIconModule, MatListModule, MatSidenavModule, MatToolbarModule} from '@angular/material';



@NgModule({
  declarations: [],
  imports: [
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatSidenavModule,
    MatToolbarModule,
    MatCardModule
  ],
  exports: [
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatSidenavModule,
    MatToolbarModule,
    MatCardModule
  ]
})
export class MaterialModule { }
