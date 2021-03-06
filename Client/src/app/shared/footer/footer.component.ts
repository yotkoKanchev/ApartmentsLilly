import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  year: number = new Date().getFullYear();
  title: string;

  constructor(
    private titleService: Title,
  ) {
    this.title = this.titleService.getTitle();
  }
}
