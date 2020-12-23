import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ForgotPasswordModel } from './models/forgot-password.model';
import { ProfileModel } from './models/profile.model';
import { ChangePasswordModel } from './models/change-password.model';

@Injectable({
  providedIn: 'root'
})
export class ProfilesService {
  private profilesPath = environment.apiUrl + "profiles";

  constructor(private http: HttpClient) { }

  getProfile() : Observable<ProfileModel>
  {
    return this.http.get<ProfileModel>(this.profilesPath);
  }

  editProfile(data: any){
    return this.http.put(this.profilesPath + "/update", data)
  }

  forgotPassword(data: ForgotPasswordModel): Observable<any> {
      return this.http.post<ForgotPasswordModel>(this.profilesPath + "/ForgotPassword", data);
  }

  changePassword(data:ChangePasswordModel) :Observable<any>{
    return this.http.put<ChangePasswordModel>(this.profilesPath + "/ChangePassword", data);
  }
}


