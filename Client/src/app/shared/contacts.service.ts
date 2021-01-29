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

  submitContactForm(data: any):  Observable<any> {
    console.log(data)
    return this.http.post<ContactFormModel>(this.contactFormPath, data);
  }
}
