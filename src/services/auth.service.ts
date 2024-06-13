import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { environment } from "../environments/environment";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  registration(data: any): Observable<any> {
    return this.http.post(this.baseUrl + "/register", data).pipe(
      catchError((error) => {
        if (error.status === 409 && error.error && error.error.userId) {
          const userData = error.error;
          console.log('Conflict occurred. UserId:', userData);
          return throwError(userData);
        }

        return throwError(error);
      })
    );
  }

  verifyRegistration(data: any) {
    return this.http.post(this.baseUrl + "/verify", data);
  }
  generateOtp(data: any) {
    console.log(data)
    return this.http.post(this.baseUrl+"/generate", data);
  }
  createCredentials(data: any) {
   
    const userId = data.userID;
    const username = data.username;
    const password = data.password;
    console.log(userId)
    const apiUrl = `${this.baseUrl}/createCredentials?userId=${userId}&username=${username}&password=${password}`;
    return this.http.post(apiUrl, {});
  }

  login(username: string, password: string): Observable<any> {
    const loginRequest = { username, password };
    return this.http.post(`${this.baseUrl}/authenticate`, loginRequest);
  }

  forgotPassword(data:string):Observable<any>{
   console.log(data)
    return this.http.post(`${this.baseUrl}/forgot-password-otp`, data)
  }
  verifyForgotPasswordOtp(data:string):Observable<any>{
    console.log(data)
     return this.http.post(`${this.baseUrl}/verify-otp`, data)
   }
   resetPassword(userId: number, newPassword: string): Observable<any> {
    const params = {
      userId: userId.toString(),
      newPassword: newPassword
    };

    return this.http.post(`${this.baseUrl}/reset-password`, null, { params: params });
  }

  adminLogin(data:string):Observable<any>{
   
     return this.http.post(`${this.baseUrl}/authenticate`, data)
   }

  private error(error: HttpErrorResponse) {
    let errorMessage = "";
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
