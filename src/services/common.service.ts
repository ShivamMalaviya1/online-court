import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { environment } from "../environments/environment";
import { JwtService } from "./jwt.service";

@Injectable({
  providedIn: "root",
})
export class CommonService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient,private jwtService: JwtService) {}

  private error(error: HttpErrorResponse) {
    let errorMessage = "";
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }

  AddCase(data: any): Observable<any> {
    const API_URL = `${this.baseUrl}api/CaseAdd`;
    return this.http.post(API_URL, data).pipe(catchError(this.error));
  }

  addFeedback(data: any): Observable<any> {
    const API_URL = `${this.baseUrl}/api/feedbacks/`;
    return this.http.post(API_URL, data).pipe(catchError(this.error));
  }
  getUserFeedbacks(): Observable<any> {
    const API_URL = `${this.baseUrl}/api/feedbacks/all`;
    return this.http.get(API_URL).pipe(catchError(this.error));
  }

  addComplain(data: any): Observable<any> {
    const API_URL = `${this.baseUrl}/api/complain/saveComplain`;
    return this.http.post(API_URL, data).pipe(catchError(this.error));
  }
  getComplain(id: any): Observable<any> {
    const API_URL = `${this.baseUrl}/api/complain/${id}`;
    return this.http.get(API_URL).pipe(catchError(this.error));
  }

  getComplainAllComplains(): Observable<any> {
    const API_URL = `${this.baseUrl}/api/complain/all`;
    return this.http.get(API_URL).pipe(catchError(this.error));
  }

  updateComplaintStatus(
    complaintId: number,
    newStatus: string
  ): Observable<any> {
    return this.http.put(
      `${this.baseUrl}/api/complain/updateStatus/${complaintId}/${newStatus}`,
      {}
    );
  }

  updateProfile(userId: string, data: any): Observable<any> {
    console.log(userId, data);
    return this.http.put(`${this.baseUrl}/update-profile/${userId}`, data).pipe(
      catchError((error) => {
        return throwError(error);
      })
    );
  }

  getCountries(): Observable<any> {
    const API_URL = `${this.baseUrl}/api/countries/all`;
    return this.http.get(API_URL).pipe(catchError(this.error));
  }
  getStates(): Observable<any> {
    const API_URL = `${this.baseUrl}/api/states/all`;
    return this.http.get(API_URL).pipe(catchError(this.error));
  }
  getDistrict(): Observable<any> {
    const API_URL = `${this.baseUrl}/api/district/all`;
    return this.http.get(API_URL).pipe(catchError(this.error));
  }
  getCities(): Observable<any> {
    const API_URL = `${this.baseUrl}/api/cities/all`;
    return this.http.get(API_URL).pipe(catchError(this.error));
  }
  categoryOption(): Observable<any> {
    const API_URL = `${this.baseUrl}/api/categoryOptions/all`;
    return this.http.get(API_URL).pipe(catchError(this.error));
  }

  getPackagesOptions(): Observable<any> {
    const API_URL = `${this.baseUrl}/api/package/allpackages`;
    return this.http.get(API_URL).pipe(catchError(this.error));
  }
  getSelectedPackagesOptions(data: any): Observable<any> {
    const API_URL = `${this.baseUrl}/api/package/selected`;
    return this.http.get(API_URL).pipe(catchError(this.error));
  }
  placePackageOrder(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/transactions/`, data).pipe(
      catchError((error) => {
        return throwError(error);
      })
    );
  }

  /***********MOBILE MAINATANENCE************* */
  getPackageMobile(): Observable<any> {
    const API_URL = `${this.baseUrl}/api/mobile-maintenance`;
    return this.http.get(API_URL).pipe(catchError(this.error));
  }
  addPackageMobile(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/mobile-maintenance`, data).pipe(
      catchError((error) => {
        return throwError(error);
      })
    );
  }
  deletePackageMobile(id: any): Observable<any> {
    return this.http
      .delete(`${this.baseUrl}/api/mobile-maintenance/${id}`)
      .pipe(
        catchError((error) => {
          return throwError(error);
        })
      );
  }
  /***************************************** */

  /***********TRANSACTION MAINATANENCE************* */
  getUserTransactions(id: any): Observable<any> {
    const API_URL = `${this.baseUrl}/api/transactions/user/${id}`;
    return this.http.get(API_URL).pipe(catchError(this.error));
  }


  getAttTrsnaction(): Observable<any> {
    const API_URL = `${this.baseUrl}/api/transactions`;
    const token = localStorage.getItem("token");
  // console.log("Token:", token);

  const headers = new HttpHeaders({
  'Authorization': `Bearer ${token}`
  });
    return this.http.get(API_URL, { headers }).pipe(catchError(this.error));
  }

 
  /***************************************** */

  // cases 

  searchCase(data: any, id:any): Observable<any> {
    const API_URL = `${this.baseUrl}/api/v1/cases/process-cases?userId=${id}`;
    return this.http.post(API_URL, data).pipe(catchError(this.error));
  }
  saveCase(data: any,id:any): Observable<any> {
    const API_URL = `${this.baseUrl}/api/v1/cases/process-cases?userId=${id}`;
    return this.http.post(API_URL, data).pipe(catchError(this.error));
  }

  getCasesByUserId(id:any):Observable<any>{
    const API_URL= `${this.baseUrl}/api/v1/usercases/user/${id}`
    return this.http.get(API_URL).pipe(catchError(this.error));
  }

  getAllCases():Observable<any>{
    const API_URL = `${this.baseUrl}/api/v1/usercases/all`;
    const token = localStorage.getItem("token");
    const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`
    });
    return this.http.get(API_URL,{ headers }).pipe(catchError(this.error))
  }

  deleteCase(id: any): Observable<any> {
    const API_URL = `${this.baseUrl}/api/v1/case-details/${id}`;
    return this.http.delete(API_URL);
  }
  //send manual messages 


  postManualMessages(selectedCases: any[]): Observable<any> {
    const API_URL = `${this.baseUrl}/api/v1/cases/send-manual-messages`;

    return this.http.post(API_URL, selectedCases, { headers: { 'Content-Type': 'application/json' } });
}

  getAllMessages():Observable<any>{
    const API_URL = `${this.baseUrl}/api/v1/messageStatus/all`
    const token = localStorage.getItem("token");
    const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`
    });
    return this.http.get(API_URL,{ headers }).pipe(catchError(this.error))


  }
  getEcourtCountries(): Observable<any> {
    const API_URL = `${this.baseUrl}/api/countries/all`;
    return this.http.get(API_URL).pipe(catchError(this.error));
  }
  getEcourtStates(): Observable<any> {
    const API_URL = `https://phoenix.akshit.me/district-court/states`;
    return this.http.get(API_URL).pipe(catchError(this.error));
  }
  getEcourtDistrict(): Observable<any> {
    const API_URL = `https://phoenix.akshit.me/district-court/districts`;
    return this.http.get(API_URL).pipe(catchError(this.error));
  }
  getEcourtCities(): Observable<any> {
    const API_URL = `${this.baseUrl}/api/cities/all`;
    return this.http.get(API_URL).pipe(catchError(this.error));
  }
 

}

