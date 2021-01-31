import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ContactFormModel } from './models/contact-form.model';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {
  private contactFormPath = environment.apiUrl + "contacts";

  constructor(
    private http: HttpClient,
  ) { }

  submitContactForm(data: any): Observable<any> {
    return this.http.post<ContactFormModel>(this.contactFormPath, data);
  }

  getAll(): Observable<Array<ContactFormModel>> {
    return this.http.get<Array<ContactFormModel>>(this.contactFormPath + '/all');
  }

  // ignore(id: number) {
  //   console.log(id)
  //   return this.http.delete(this.contactFormPath + '/' + id);
  // }

  ignore(id: number) {
    console.log(this.contactFormPath + '/' + id)
    return this.http.delete(this.contactFormPath + '/' + id);
  }
}
