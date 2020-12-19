import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { LoginModel } from './models/login.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginPath = environment.apiUrl + "identity/login";
  private registerPath = environment.apiUrl + "identity/register";

  constructor(private http: HttpClient, private router: Router) { }

  login(data): Observable<any> {
    return this.http.post<LoginModel>(this.loginPath, data)
      .pipe(map(user => {
        if (user.isAdmin) {
          localStorage.setItem('admin', JSON.stringify(user));
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

  getAdmin() {
    return JSON.parse(localStorage.getItem('admin'));
  }

  getToken() {
    let admin = this.getAdmin();
    if (admin) {
      return admin.token;
    }

    return localStorage.getItem('token');
  }

  getName() {
    let admin = this.getAdmin();

    if (admin) {
      return admin.name;
    }

    return localStorage.getItem('name');
  }

  isAuthenticated() {
    return localStorage.getItem('admin') || localStorage.getItem('token');
  }

  isAdmin() {
    return this.getAdmin();
  }
}
