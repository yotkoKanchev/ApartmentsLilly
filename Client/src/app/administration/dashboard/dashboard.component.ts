import { Component, OnInit } from '@angular/core';
import { ReservationListingModel } from 'src/app/reservations/models/reservation-listing.model';
import { ReservationsService } from 'src/app/reservations/reservations.service';
import { EnumerationModel } from 'src/app/shared/models/enumeration.model';
import { CalendarOptions } from '@fullcalendar/angular';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  reservations: Array<ReservationListingModel>;
  newReservations: Array<ReservationListingModel>;
  reservationsStatuses: EnumerationModel;

  constructor(
    private reservationsService: ReservationsService,
  ) { }

  ngOnInit(): void {
    this.fetchReservations();
  }

  fetchReservations() {
    this.reservationsService.getAll().subscribe(data => {
      this.reservations = data;
      this.newReservations = this.reservations.filter(r => r.status == "Requested")
    });

    this.reservationsService.getStatuses().subscribe(data => {
      this.reservationsStatuses = data;
    });
  }

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    // weekends: false, 
    dateClick: this.handleDateClick.bind(this), // bind is important!
    events: [
      { title: 'event 1', date: '2021-02-21' },
      { title: 'event 2', date: '2021-02-12' }
    ]
  };

  handleDateClick(arg) {
    alert('date click! ' + arg.dateStr)
  }
}