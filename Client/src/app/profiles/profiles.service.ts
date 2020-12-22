import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ForgotPasswordModel } from './models/forgot-password.model';

@Injectable({
  providedIn: 'root'
})
export class ProfilesService {
  private profilesrPath = environment.apiUrl + "profiles";

  constructor(private http: HttpClient) { }

  // TODO work here
  forgotPassword(data: ForgotPasswordModel): Observable<any> {
      return this.http.post<ForgotPasswordModel>(this.profilesrPath + "/ForgotPassword", data);
  }
}


