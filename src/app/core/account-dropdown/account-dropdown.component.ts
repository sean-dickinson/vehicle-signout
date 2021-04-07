import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { VehicleUser } from "app/models/vehicle-user";

@Component({
  selector: "app-account-dropdown",
  templateUrl: "./account-dropdown.component.html",
  styleUrls: ["./account-dropdown.component.css"],
})
export class AccountDropdownComponent implements OnInit {
  @Input() user: VehicleUser;
  @Output() logout = new EventEmitter<VehicleUser>();
  constructor() {}

  ngOnInit(): void {}
}
