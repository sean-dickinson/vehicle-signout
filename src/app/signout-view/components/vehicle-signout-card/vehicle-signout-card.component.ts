import { Component, Input, OnInit } from "@angular/core";
import { Vehicle } from "../../../models/vehicle";
import { VehicleSignout } from "../../../models/vehicle-signout";

@Component({
  selector: "vehicle-signout-card",
  templateUrl: "./vehicle-signout-card.component.html",
  styleUrls: ["./vehicle-signout-card.component.css"],
})
export class VehicleSignoutCardComponent implements OnInit {
  @Input() vehicle: Vehicle;
  @Input() signouts: VehicleSignout[];
  @Input() lastSignout: VehicleSignout;
  @Input() currentTime: string;
  constructor() {}

  ngOnInit(): void {}

  get currentSignoutID(): string {
    if(this.signouts){
     const currentSignout = this.signouts.find(s => this.currentTime >= s.startTime && this.currentTime <= s.endTime);
    return currentSignout ? currentSignout.uid : null;
   }
   return null;
  
  }
}
