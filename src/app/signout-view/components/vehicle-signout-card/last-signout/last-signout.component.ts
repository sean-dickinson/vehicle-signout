import { Component, Input, OnInit } from '@angular/core';
import { VehicleSignout } from '../../../../models/vehicle-signout';

@Component({
  selector: 'last-signout',
  templateUrl: './last-signout.component.html',
  styleUrls: ['./last-signout.component.css']
})
export class LastSignoutComponent implements OnInit {
  @Input() signout: VehicleSignout;
  constructor() { }

  ngOnInit(): void {
  }
}
