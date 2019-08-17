import {Injectable} from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment
} from '@angular/router';
import {Observable, of} from 'rxjs';
import {AngularFireAuth} from '@angular/fire/auth';
import {map, take} from 'rxjs/operators';
// tiramos o código
// @Injectable({
//   providedIn: 'root'
// })
// pois sabemos onde ele será usado, então não precisa ser chamado no app.module, chamamos somente no core.module

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {

  constructor(private authFire: AngularFireAuth, private router: Router) {

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.isAuthenticated();
  }

  canLoad( route: Route, segments: UrlSegment[]): Observable<boolean> {
    return this.isAuthenticated();
  }

  isAuthenticated(): Observable<boolean> {
    return  this.authFire.user.pipe(
      map(user => {
        if (!user) {
          this.router.navigate(['core', 'layout', 'login']).then();
        }
        return !!user; // negar duas vezes retorna um booleano
      }),
      take(1),
    );
  }

}
