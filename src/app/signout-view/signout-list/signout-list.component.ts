import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { VehicleSignout } from 'app/models/vehicle-signout';

@Component({
  selector: 'signout-list',
  templateUrl: './signout-list.component.html',
  styleUrls: ['./signout-list.component.css']
})
export class SignoutListComponent implements OnChanges {
  @Input() signouts: VehicleSignout[];
  dataSource = new MatTableDataSource<VehicleSignout>();
  columns: string[] = [
    'userName',
    'reason',
    'startTime',
    'endTime'
  ];
  constructor() {}

  ngOnChanges(changes: SimpleChanges){
    if(changes.signouts && changes.signouts.currentValue !== changes.signouts.previousValue && changes.signouts.currentValue){
      this.dataSource.data = this.signouts;
    }
  }

}
