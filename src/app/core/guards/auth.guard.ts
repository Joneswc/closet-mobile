import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
// tiramos o código
// @Injectable({
//   providedIn: 'root'
// })
// pois sabemos onde ele será usado, então não precisa ser chamado no app.module, chamamos somente no core.module

@Injectable()
export class AuthGuard implements CanLoad {
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    return true;
  }
}
