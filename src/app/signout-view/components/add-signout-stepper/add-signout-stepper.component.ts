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
import {
  AsyncValidatorFn,
  FormBuilder,
  FormGroup,
  Validators,
} from "@angular/forms";
import { ErrorStateMatcher } from "@angular/material/core";
import { Vehicle } from "app/models/vehicle";
import { VehicleSignout } from "app/models/vehicle-signout";
import { SignoutDataService } from "app/signout-data.service";
import {
  combineDateTime,
  compareByProp,
  compareUID,
  getTimestring,
} from "app/utilities/functions";
import { ReplaySubject, Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import {
  dateRangeValidator,
  ParentErrorStateMatcher,
} from "./validation-helpers";

@Component({
  selector: "add-signout-stepper",
  templateUrl: "./add-signout-stepper.component.html",
  styleUrls: ["./add-signout-stepper.component.css"],
})
export class AddSignoutStepperComponent
  implements OnInit, OnChanges, OnDestroy {
  generalStepGroup: FormGroup;
  timeStepGroup: FormGroup;
  today: Date;
  init: boolean;
  maxStartDate$: ReplaySubject<Date>;
  minEndDate$: ReplaySubject<Date>;
  destroy$: Subject<boolean>;
  @Input() vehicles: Vehicle[];
  @Input() signout: VehicleSignout;
  @Output() signoutChange = new EventEmitter<VehicleSignout>();
  compareFn = compareUID;
  conflictValidator: AsyncValidatorFn;
  grandParentMatcher: ErrorStateMatcher;
  constructor(private fb: FormBuilder, private sds: SignoutDataService) {}

  ngOnInit(): void {
    this.destroy$ = new Subject<boolean>();
    this.maxStartDate$ = new ReplaySubject<Date>(1);
    this.minEndDate$ = new ReplaySubject<Date>(1);
    this.today = new Date();

    this.generalStepGroup = this.fb.group({
      vehicleCtrl: ["", Validators.required],
      reasonCtrl: [""],
    });
    this.timeStepGroup = this.fb.group(
      {
        startParentGroup: this.fb.group({
          startDateCtrl: ["", Validators.required],
          startTimeCtrl: ["", Validators.required],
        }),
        endParentGroup: this.fb.group({
          endDateCtrl: ["", Validators.required],
          endTimeCtrl: ["", Validators.required],
        }),
      },
      {
        validators: dateRangeValidator,
      }
    );

    this.timeStepGroup
      .get("startParentGroup")
      .valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe((controls) => {
        if (controls) {
          const minEndDate = combineDateTime(
            controls.startDateCtrl,
            controls.startTimeCtrl
          );
          this.minEndDate$.next(minEndDate);
        }
      });

    this.timeStepGroup
      .get("endParentGroup.endDateCtrl")
      .valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe((date) => {
        if (date) {
          this.maxStartDate$.next(date);
        }
      });

    this.generalStepGroup
      .get("vehicleCtrl")
      .valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.conflictValidator = this.sds.signoutConflict(this.signout);
        this.timeStepGroup.setAsyncValidators(this.conflictValidator);
        this.timeStepGroup.updateValueAndValidity();
      });

    this.grandParentMatcher = new ParentErrorStateMatcher();
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

  ngOnDestroy() {
    this.destroy$.next(false);
    this.destroy$.unsubscribe();
  }

  get currentSignout(): VehicleSignout {
    let startTime = this.signout.startTime || new Date().toISOString();
    let endTime = this.signout.endTime || new Date().toISOString();
    try {
      startTime = combineDateTime(
        this.timeStepGroup.get("startParentGroup.startDateCtrl").value,
        this.timeStepGroup.get("startParentGroup.startTimeCtrl").value
      ).toISOString();
      endTime = combineDateTime(
        this.timeStepGroup.get("endParentGroup.endDateCtrl").value,
        this.timeStepGroup.get("endParentGroup.endTimeCtrl").value
      ).toISOString();
    } finally {
      const vehicle = this.generalStepGroup.get("vehicleCtrl").value;
      return {
        ...this.signout,
        vehicleID: vehicle.uid,
        vehicleName: vehicle.name,
        reason: this.generalStepGroup.get("reasonCtrl").value || "",
        startTime,
        endTime,
      };
    }
  }
}
