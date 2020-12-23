import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { CreateBedModel } from './models/create-bed.model';

@Injectable({
  providedIn: 'root'
})
export class BedsService {
  private bedsPath = environment.apiUrl + 'Beds';

  constructor(private http: HttpClient) { }

  getBedTypes(): Observable<any> {
    return this.http.get<any>(this.bedsPath + '/' + 'bedTypes');
  }

  create(data): Observable<CreateBedModel> {
    return this.http.post<CreateBedModel>(this.bedsPath, data)
  }

  deleteBed(id: number) {
    return this.http.delete(this.bedsPath + '/' + id);
  }
}
