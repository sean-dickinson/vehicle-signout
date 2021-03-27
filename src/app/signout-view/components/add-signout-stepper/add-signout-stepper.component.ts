import { formatDate } from "@angular/common";
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Vehicle } from "app/models/vehicle";
import { VehicleSignout } from "app/models/vehicle-signout";
import {
  combineDateTime,
  compareByProp,
  compareUID,
  getTimestring,
} from "app/utilities/functions";

@Component({
  selector: "add-signout-stepper",
  templateUrl: "./add-signout-stepper.component.html",
  styleUrls: ["./add-signout-stepper.component.css"],
})
export class AddSignoutStepperComponent implements OnInit, OnChanges {
  generalStepGroup: FormGroup;
  timeStepGroup: FormGroup;
  today: Date;
  init: boolean;
  @Input() vehicles: Vehicle[];
  @Input() signout: VehicleSignout;
  @Output() signoutChange = new EventEmitter<VehicleSignout>();
  compareFn = compareUID
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    // TODO: Implement Validation
    this.generalStepGroup = this.fb.group({
      vehicleCtrl: ['', Validators.required],
      reasonCtrl: [""],
    });
    this.timeStepGroup = this.fb.group({
      startParentGroup: this.fb.group({
        startDateCtrl: ['', Validators.required],
        startTimeCtrl: [
         '',
          Validators.required,
        ],
      }),
      endParentGroup: this.fb.group({
        endDateCtrl: ['', Validators.required],
        endTimeCtrl: [
         '',
          Validators.required,
        ],
      }),
    });
  }

  ngOnChanges() {
    if (this.signout && this.vehicles) {
      let vehicle = this.vehicles.find((v) => v.uid === this.signout.vehicleID);
      this.generalStepGroup.get("vehicleCtrl").setValue(vehicle);
      this.generalStepGroup.get("reasonCtrl").setValue(this.signout.reason);
      const start = new Date(this.signout.startTime);
      const end = new Date(this.signout.endTime);
      this.timeStepGroup.setValue({
        startParentGroup: {
          startDateCtrl: start,
          startTimeCtrl: getTimestring(start),
        },
        endParentGroup: {
          endDateCtrl: end,
          endTimeCtrl: getTimestring(end),
        },
      });
      this.init = true;
    }
  }


  get currentSignout(): VehicleSignout {
   
      const startTime = combineDateTime(
        this.timeStepGroup.get("startParentGroup.startDateCtrl").value,
        this.timeStepGroup.get("startParentGroup.startTimeCtrl").value
      ).toISOString();
      const endTime = combineDateTime(
        this.timeStepGroup.get("endParentGroup.endDateCtrl").value,
        this.timeStepGroup.get("endParentGroup.endTimeCtrl").value
      ).toISOString();
      const vehicle = this.generalStepGroup.get("vehicleCtrl").value;
      return {
        ...this.signout,
        vehicleID: vehicle.uid,
        vehicleName: vehicle.name,
        reason: this.generalStepGroup.get("reasonCtrl").value || '',
        startTime,
        endTime
      };
   
  }
}
