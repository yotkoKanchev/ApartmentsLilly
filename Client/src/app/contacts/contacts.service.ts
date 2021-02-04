import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ContactFormModel } from './models/contact-form.model';
import { MessageReplyModel } from './models/message-reply.model';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {
  private contactFormPath = environment.apiUrl + "Contacts";
  constructor(
    private http: HttpClient,
  ) { }

  submitContactForm(data: any): Observable<any> {
    return this.http.post<ContactFormModel>(this.contactFormPath, data);
  }

  getAll(): Observable<Array<ContactFormModel>> {
    return this.http.get<Array<ContactFormModel>>(this.contactFormPath + '/all');
  }

  get(id: number): Observable<ContactFormModel> {
    return this.http.get<ContactFormModel>(this.contactFormPath + '/' + id);
  }

  ignore(id: number) {
    console.log('delete')
    console.log(this.contactFormPath + '/' + id)
    // return this.http.get(this.contactFormPath + '/' + id);
    return this.http.put<number>(this.contactFormPath + '/' + id, id);
  }

  reply(id: number, data: any) {
    var model = new MessageReplyModel();
      model.id = id;
      model.reply = data.content;

    return this.http.put<MessageReplyModel>(this.contactFormPath, model);
  }
}
