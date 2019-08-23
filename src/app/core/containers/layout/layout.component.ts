import { Component, OnInit } from '@angular/core';
import {select, Store} from '@ngrx/store';
import {CoreState} from '../../store/reducers/feature.reducers';
import {Observable} from 'rxjs';
import {isAuthenticated} from '../../store/selectors/auth.selectors';
import {signout} from '../../store/actions/auth.actions';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  isAuthenticated$: Observable<boolean>;

  constructor(private store: Store<CoreState>) { }

  ngOnInit() {
    this.isAuthenticated$ = this.store.pipe(select(isAuthenticated));
  }



  logout() {
    this.store.dispatch(signout());
  }

}
