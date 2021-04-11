import { Component, Input, OnInit } from '@angular/core';
import { VehicleSignout } from 'app/models/vehicle-signout';
import { getDateString } from 'app/utilities/helper-functions';

@Component({
  selector: 'app-signout-timing-cell',
  templateUrl: './signout-timing-cell.component.html',
  styleUrls: ['./signout-timing-cell.component.css']
})
export class SignoutTimingCellComponent implements OnInit {
  @Input() signout: VehicleSignout
  @Input() isAlone: boolean;
  constructor() { }

  ngOnInit(): void {
  }

  get isSingleDay(): boolean{
    if(this.signout){
      const startDatestring = getDateString(new Date(this.signout.startTime));
      const endDatestring = getDateString(new Date(this.signout.endTime));
      return startDatestring === endDatestring;
    }
    return false;
  }

}
