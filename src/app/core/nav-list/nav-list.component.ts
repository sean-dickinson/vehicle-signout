import { Component, Input, OnInit } from '@angular/core';
import { Vehicle } from '../../models/vehicle';
import { VehicleUser } from '../../models/vehicle-user';

@Component({
  selector: 'nav-list',
  templateUrl: './nav-list.component.html',
  styleUrls: ['./nav-list.component.css']
})
export class NavListComponent implements OnInit {
  @Input() vehicles: Vehicle[];
  @Input() user: VehicleUser;
  constructor() { }

  ngOnInit(): void {
  }

}
