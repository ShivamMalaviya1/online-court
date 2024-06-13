import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  private error(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }

  getUserById(id: any): Observable<any> {
    const API_URL = `${this.baseUrl}/user/${id}`;
    return this.http.get(API_URL).pipe(catchError(this.error));
  }
  // Add a method to delete mobile maintenance by ID
  deleteMobileMaintainance(mobileMaintenanceId: number): Observable<any> {
    const API_URL = `${this.baseUrl}/api/mobile-maintenance/${mobileMaintenanceId}`;
    return this.http.delete(API_URL).pipe(catchError(this.error));
  }

  
}
