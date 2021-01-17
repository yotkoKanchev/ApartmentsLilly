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

  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }

  login(data): Observable<any> {
    return this.http.post<LoginModel>(this.loginPath, data)
      .pipe(map(res => {
        const user = res;
        if (!user.isAdmin) {
          delete user.isAdmin;
          localStorage.setItem('user', JSON.stringify(user));
        }
        else {
          localStorage.setItem('lillysAdmin', JSON.stringify(user));
        }
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
    let user = JSON.parse(localStorage.getItem('user'));
    return user ? user : JSON.parse(localStorage.getItem('lillysAdmin'));
  }

  getToken() {
    let user = this.getUser();
    return user ? user['token'] : null;
  }

  getName() {
    let user = this.getUser();
    return user ? user['name'] : null;
  }

  getAvatar() {
    let user = this.getUser();
    return user ? user['avatarUrl'] : null;
  }

  isAuthenticated() {
    return this.getUser();
  }

  isAdmin() {
    let user = this.getUser();
    return user == null ? null : user.isAdmin;
  }
}
