import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title: string = 'Apartments Lilly';
  show: boolean = true;
  constructor(
    private titleService: Title,
    private location: Location,
  ) {
    this.titleService.setTitle(this.title);

    if (this.location.path().startsWith('/dashboard')) {
      this.show = false;
    }
  }
}
