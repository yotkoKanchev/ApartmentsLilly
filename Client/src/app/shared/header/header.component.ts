import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  title: string = "Lilly's"
  avatar: string;
  toggleNavbar = true;
  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    const userAvatar = JSON.parse(localStorage.getItem('user'))['avatarUrl'];
    this.avatar = userAvatar ? userAvatar : 'assets/images/noAvatar.png';
  }

  logout() {
    this.authService.logout();
  }

}
