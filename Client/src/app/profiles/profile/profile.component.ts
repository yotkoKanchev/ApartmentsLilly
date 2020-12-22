import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProfileModel } from '../models/profile.model';
import { ProfilesService } from '../profiles.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profile: ProfileModel;
  constructor(
    private profilesService: ProfilesService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.fetchApartment()
  }

  fetchApartment() {
    this.profilesService.getProfile().subscribe(res => {
      this.profile = res;

      if(!this.profile.avatarUrl){
        this.profile.avatarUrl = 'assets/images/noAvatar.png';
      }
    })
  }

}
