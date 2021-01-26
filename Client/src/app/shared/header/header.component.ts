import { Component, OnInit } from '@angular/core';
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

  constructor(
    private authService: AuthService,
  ) {
  }

  ngOnInit(): void {
    const user = localStorage.getItem('user');
    const avatar = user ? JSON.parse(user)['avatarUrl'] : localStorage.getItem('avatarUrl');
    this.avatar = avatar ? avatar : 'assets/images/noAvatar.png';
    console.log(this.getAvatar())
  }

  logout() {
    this.authService.logout();
  }

  getAvatar(){
    return this.authService.getAvatar();
  }

  getName(){
    return this.authService.getName();
  }

  isAdmin(){
    return this.authService.isAdmin();
  }

  isAuthenticated(){
    return this.authService.isAuthenticated();
  }
}
