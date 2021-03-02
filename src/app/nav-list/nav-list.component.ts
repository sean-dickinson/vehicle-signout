import { Component, Input, OnInit } from '@angular/core';
import { Vehicle } from 'app/vehicle';
import { VehicleUser } from 'app/vehicle-user';

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
