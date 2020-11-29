import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  name: string = "default name";
  title: string = "Lilly's"
  toggleNavbar = true;
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }
}
