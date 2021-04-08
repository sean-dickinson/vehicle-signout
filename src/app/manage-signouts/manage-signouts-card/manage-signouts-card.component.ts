import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { VehicleSignout } from 'app/models/vehicle-signout';
import { VehicleUser } from 'app/models/vehicle-user';

@Component({
  selector: 'app-manage-signouts-card',
  templateUrl: './manage-signouts-card.component.html',
  styleUrls: ['./manage-signouts-card.component.css']
})
export class ManageSignoutsCardComponent implements OnInit {
  @Input() signouts: VehicleSignout[];
  @Input() type: string;
  @Input() user: VehicleUser;
  @Input() time: string;
  @Output() edit = new EventEmitter<VehicleSignout>();
  @Output() remove = new EventEmitter<VehicleSignout>();
  currentColumns = ['reason', 'startTime', 'endTime', 'actions']
  constructor() { }

  ngOnInit(): void {
  }

  get columns(): string[] {
    return this.type === 'Current' ? this.currentColumns : [];
  }


}
