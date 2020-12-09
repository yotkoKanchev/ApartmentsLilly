import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginPath = environment.apiUrl + "identity/login";
  private registerPath = environment.apiUrl + "identity/register";

  constructor(private http: HttpClient, private router: Router) { }

  login(data): Observable<any> {
    return this.http.post(this.loginPath, data)
  }

  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    this.router.navigate(['/apartments']);
  }

  register(data): Observable<any> {
    this.router.navigate(['/login']);
    return this.http.post(this.registerPath, data);
  }

  saveToken(token) {
    localStorage.setItem('token', token)
  }

  saveName(name) {
    localStorage.setItem('name', name)
  }

  getToken() {
    return localStorage.getItem('token')
  }

  getName() {
    return localStorage.getItem('name')
  }

  isAuthenticated() {
      if (this.getToken()) {
        return true
      }
      return false;
  }
}