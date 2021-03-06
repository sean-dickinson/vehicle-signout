import { Component, Input, OnInit } from "@angular/core";
import { Vehicle } from "../../models/vehicle";
import { VehicleSignout } from "../../models/vehicle-signout";

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

  isCurrentlyOut(): boolean {
    if (this.lastSignout && this.currentTime) {
      return this.lastSignout.endTime > this.currentTime;
    }
    return false;
  }
}
