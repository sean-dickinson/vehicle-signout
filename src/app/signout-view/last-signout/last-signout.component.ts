import { formatDate } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { VehicleSignout } from '../../models/vehicle-signout';

@Component({
  selector: 'last-signout',
  templateUrl: './last-signout.component.html',
  styleUrls: ['./last-signout.component.css']
})
export class LastSignoutComponent implements OnInit {
  @Input() signout: VehicleSignout;
  @Input() isCurrent: boolean;
  constructor() { }

  ngOnInit(): void {
  }

  getText(): string{
    let message = '';
    if(this.isCurrent){
      message += `Currently signed out by ${this.signout.userName}`
    } else {
      message += `Last signed out by ${this.signout.userName}`
    }
    
    if(this.signout.reason){
      message += ` for ${this.signout.reason.toLowerCase()}`;
    }

    message += ` with a return time of ${formatDate(this.signout.endTime, 'short', 'en')}`;
    return message
  }

}
