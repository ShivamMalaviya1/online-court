import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  private authenticationSubject = new Subject<boolean>();

  decodeJwtToken() {
    const token = this.getToken();
    if (token) {
      try {
      
        const decodedToken: any = jwtDecode(token);
       
        return decodedToken;
      } catch (error) {
        return null;
      }
    }
    return null;
  }

  getToken() {
      return localStorage.getItem("token");
  }

  setToken(token: string) {
    localStorage.setItem("token", token);
    return this.authenticationSubject.next(true);
  }

  removeToken() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    return this.authenticationSubject.next(false);
  }

  getAuthenticationStatus() {
    return this.authenticationSubject;
  }

  getUserRole() {
    const decodedToken = this.decodeJwtToken();
    return decodedToken && decodedToken.roles
      ? decodedToken.roles.map((role: { authority: any; }) => role.authority)
      : [];
  }
  
  isTokenExpired() {
    const decodedToken = this.decodeJwtToken();
    if (decodedToken && decodedToken.exp) {
      const currentTime = Math.floor(Date.now() / 1000);
      return decodedToken.exp < currentTime;
    }
    return true; 
  }

  getPermissions() {
    const decodedToken = this.decodeJwtToken();
    return decodedToken && decodedToken.Permissions ? decodedToken.Permissions : [];
  }

  getRedirectRoute() {
    const permissions = this.getPermissions();
    const permissionToRouteMap: any = {
      'USER': 'user-portal',
      'ADMIN': 'admin-portal',
    };

    // console.log(permissions);

    for (const per of permissions) {
      // console.log(per, permissionToRouteMap[per]);

      const routePath = permissionToRouteMap[per];
      if (routePath) {
        return routePath;
      }
    }
    return 'admin-portal';
  }

  isAuthenticated() {
    const token = this.getToken();
  
    // console.log(token);
    if (token && !this.isTokenExpired()) {
      return true;
    } else {
      return false;
    }
  }
  

  getName() {
    const decodedToken = this.decodeJwtToken();
    if (decodedToken && decodedToken.sub) {
      return decodedToken.sub;
    } else {
      return "Admin";
    }
  }

  hasPermission(permission: string) {
    const decodedToken = this.decodeJwtToken();
    if (decodedToken && decodedToken.Permissions) {
      return decodedToken.Permissions.includes(permission);
    }
    return false;
  }

  logout() {
    this.removeToken();
  }
}
