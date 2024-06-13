import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { JwtService } from '../services/jwt.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const userRoles = this.jwtService.getUserRole();
  
    if (!userRoles || userRoles.length === 0) {
      this.router.navigate(['/login']);
      return false;
    }
  
    const requiredRoles = route.data['roles'] as string[];
    
    if (requiredRoles && requiredRoles.length > 0 && !requiredRoles.some(role => userRoles.includes(role))) {
      this.router.navigate(['/not-found']);
      return false;
    }
  
    return true;
  }
}
