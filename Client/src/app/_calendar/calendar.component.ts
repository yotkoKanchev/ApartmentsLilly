import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular'; // useful for typechecking
import { ReservationListingModel } from 'src/app/reservations/models/reservation-listing.model';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  posts = [];
  calendarOptions: CalendarOptions;
  private reservationsPath = environment.apiUrl + "reservations";

  constructor(
    private http: HttpClient,
  ) { }

  ngOnInit() {
    return this.http.get<Array<ReservationListingModel>>(this.reservationsPath + '/all', {}).subscribe(data => {
      data.forEach(reservation => {
        this.posts.push({
          // id: reservation.id.toString(),
          title: reservation.apartmentName + ' - ' + reservation.fullName,
          start: reservation.from,
          end: reservation.to,
          backgroundColor: reservation.apartmentName == "Лили 1" ? 'red' : (reservation.apartmentName == 'Лили 2' ? 'blue' : 'orange')
        })
      });
      this.posts.push(data);

      this.calendarOptions = {
        initialView: 'dayGridMonth',
        height: 600,
        dateClick: this.handleDateClick.bind(this), // bind is important!
        events: this.posts
      };
    });
  }

  handleDateClick(arg) {
    alert('date click! ' + arg.dateStr)
  }

}
