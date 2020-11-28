import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AnyARecord } from 'dns';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {
  searchApartmentForm : FormGroup
  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(){}
}
