import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  title: string = "Lilly's"
  avatar: string = 'assets/images/noAvatar.png';
  toggleNavbar = true;
  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
  }

  logout() {
      this.authService.logout();
  }

}
