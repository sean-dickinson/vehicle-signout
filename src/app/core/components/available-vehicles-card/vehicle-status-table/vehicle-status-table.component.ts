import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { Vehicle } from "app/models/vehicle";
import { VehicleSignout } from "app/models/vehicle-signout";

@Component({
  selector: "app-vehicle-status-table",
  templateUrl: "./vehicle-status-table.component.html",
  styleUrls: ["./vehicle-status-table.component.css"],
})
export class VehicleStatusTableComponent implements OnInit, OnChanges {
  @Input() vehicles: Vehicle[];
  @Input() currentSignouts: VehicleSignout[];
  dataSource = new MatTableDataSource<Vehicle>();
  displayedColumns = ["vehicleName", "status", 'link'];
  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.vehicles) {
      this.dataSource.data = this.vehicles;
    }
  }

  getStatus(vehicle: Vehicle): "In Use" | "Available" {
    return this.currentSignouts &&
      this.currentSignouts.find((s) => s.vehicleID === vehicle.uid)
      ? "In Use"
      : "Available";
  }
}
