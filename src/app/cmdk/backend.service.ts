import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BackendService {
  private baseUrl = 'http://localhost:10001';

  constructor(private http: HttpClient) {}

  post(endpoint: string, data: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}${endpoint}`, data).pipe(
      map((responseData: any) => responseData),
      catchError((error) => {
        console.error('Error posting data:', error);
        return throwError(error);
      })
    );
  }
}

