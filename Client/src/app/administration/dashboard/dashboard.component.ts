import { Component, OnInit } from '@angular/core';
import { ReservationListingModel } from 'src/app/reservations/models/reservation-listing.model';
import { ReservationsService } from 'src/app/reservations/reservations.service';
import { EnumerationModel } from 'src/app/shared/models/enumeration.model';
import { CalendarOptions, EventInput } from '@fullcalendar/angular';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  reservations: Array<ReservationListingModel>;
  newReservations: Array<ReservationListingModel>;
  reservationsStatuses: EnumerationModel;
  calendarEvents: Array<EventInput> = new Array<EventInput>();

  constructor(
    private reservationsService: ReservationsService,
  ) { 
    this.fetchReservations();
    console.log(this.calendarEvents)
  }

  ngOnInit(): void {
  }

  fetchReservations() {
    this.reservationsService.getAll().subscribe(data => {
      this.reservations = data;
      this.newReservations = this.reservations.filter(r => r.status == "Requested")

      this.reservations.forEach(reservation => {
        this.calendarEvents.push({
          // id: reservation.id.toString(),
          title: reservation.fullName,
          start: new Date(reservation.from).toISOString().slice(0, 10),
          end: new Date(reservation.to).toISOString().slice(0, 10),
        })
      });
    });

    this.reservationsService.getStatuses().subscribe(data => {
      this.reservationsStatuses = data;
    });
  }

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    height: 600,
    dateClick: this.handleDateClick, // bind is important!
    initialEvents: this.calendarEvents,
  };

  handleDateClick(arg) {
    alert('date click! ' + arg.dateStr)
  }
}