import { Component, OnInit } from '@angular/core';
import { ProfileModel } from '../models/profile.model';
import { ProfilesService } from '../profiles.service';

@Component({
  selector: 'app-list-profiles',
  templateUrl: './list-profiles.component.html',
  styleUrls: ['./list-profiles.component.css']
})
export class ListProfilesComponent implements OnInit {
  profiles: Array<ProfileModel>;

  constructor(
    private profilesService: ProfilesService,
  ) { }

  ngOnInit(): void {
    this.fetchProfiles();
  }

  fetchProfiles() {
    this.profilesService.getAll().subscribe(data => {
      this.profiles = data;
    });
  }
}
