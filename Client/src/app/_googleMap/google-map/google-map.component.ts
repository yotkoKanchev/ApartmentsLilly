import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.css']
})
export class GoogleMapComponent implements OnInit {
  address: SafeResourceUrl;
  @Input()
  country: string;
  @Input()
  city: string;
  @Input()
  height:string;
  @Input()
  width:string;
  @Input()
  streetAddress: string;
  constructor(
    private sanitizer: DomSanitizer,

  ) { }

  ngOnInit(): void {
    this.address = this.sanitizer.bypassSecurityTrustResourceUrl(
      environment.googleMaps + this.streetAddress + '+' + this.city  + '+' + this.country 
    );
  }
}


