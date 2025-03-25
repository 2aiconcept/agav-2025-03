import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../../environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  // private router = inject(Router);
  private url = environment.url;

  // signin
  public signIn(credentials: {
    email: string;
    password: string;
  }): Observable<any> {
    return this.http.post<any>(`${this.url}/login`, credentials);
  }
}
