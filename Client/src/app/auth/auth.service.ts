import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { LoginModel } from './models/login.model';
import { DeleteModel } from './models/delete.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginPath = environment.apiUrl + "identity/login";
  private registerPath = environment.apiUrl + "identity/register";
  private deletePath = environment.apiUrl + "identity/delete";

  constructor(private http: HttpClient, private router: Router) { }

  login(data): Observable<any> {
    return this.http.post<LoginModel>(this.loginPath, data)
      .pipe(map(user => {
        if (user.isAdmin) {
          localStorage.setItem('user', JSON.stringify(user));
        } else {
          localStorage.setItem('name', user['name']);
          localStorage.setItem('token', user['token']);
        }
        return user;
      }));
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/']);
  }

  register(data): Observable<any> {
    this.router.navigate(['/login']);
    return this.http.post(this.registerPath, data);
  }

  delete(data: DeleteModel): Observable<any> {
    let options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      body: data
    }
    
    return this.http.delete(this.deletePath, options)
  }

  getUser() {
    return JSON.parse(localStorage.getItem('user'));
  }

  getToken() {
    let user = this.getUser();
    return user ? user.token : localStorage.getItem('token');
  }

  getName() {
    let user = this.getUser();
    return user ? user.name : localStorage.getItem('name');
  }

  isAuthenticated() {
    return localStorage.getItem('user') || localStorage.getItem('token');
  }

  isAdmin() {
    return this.getUser();
  }
}
