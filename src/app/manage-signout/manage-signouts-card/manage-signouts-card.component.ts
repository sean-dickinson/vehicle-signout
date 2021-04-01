import { Component, Input, OnInit } from '@angular/core';
import { VehicleSignout } from 'app/models/vehicle-signout';
import { VehicleUser } from 'app/models/vehicle-user';

@Component({
  selector: 'manage-signouts-card',
  templateUrl: './manage-signouts-card.component.html',
  styleUrls: ['./manage-signouts-card.component.css']
})
export class ManageSignoutsCardComponent implements OnInit {
  @Input() signouts: VehicleSignout[];
  @Input() user: VehicleUser;
  @Input() time: string;
  constructor() { }

  ngOnInit(): void {
  }

}
